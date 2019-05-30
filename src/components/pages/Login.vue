<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
         />
         <div class="register-panel">
            <van-field 
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrorMsg"
            />

            <van-field 
                v-model="password"
                type="password"
                label="密码" 
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
               
            />
            <div class="sms">
                <van-field 
                    v-model="sms"
                    type="text"
                    label="验证码" 
                    placeholder="请输入验证码"
                    required
                    :error-message="smsErrorMsg"
                    class="sms-field">
                </van-field>
                <identify @getIdentifyCode="getIdentifyCode"></identify>
            </div>

            <div class="register-button">
                <van-button type="primary" @click="loginAction" size="large" :loading="openLoading">登录</van-button>
            </div>
         </div>
    </div>
</template>

<script>
    import identify from '@/components/component/identify/index'
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    export default {
        components:{
            identify
        },
        data() {
            return {
                username: '',
                password: '',
                sms:'',
                smsCode:'',
                openLoading:false, //是否开启用户注册的Loading状态
                usernameErrorMsg:'',  //当用户名出现错误时的提示信息
                passwordErrorMsg:'',  //当密码出现错误时的提示信息
                smsErrorMsg:''
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登录过了')
                this.$router.push('/')
            }
        },
       methods: {
           getIdentifyCode(code){
               this.smsCode=code
           },
           goBack() {
               this.$router.go(-1)
           },
            loginAction(){
                this.checkForm() && this.axiosLoginUser()
            },

           axiosLoginUser(){
               this.openLoading=true;
               axios({
                   url:url.login,
                   method: 'post',
                   data:{
                       userName:this.username,
                       password:this.password
                   }
               })
               .then(response=>{
                   

                 console.log(response) 
                if(response.data.code==200 && response.data.message){
                    new Promise((resolve,reject)=>{
                       localStorage.userInfo= JSON.stringify({userName:this.username})
                       setTimeout(()=>{resolve()},500)
                   }).then(()=>{
                        Toast.success('登录成功')
                        this.$router.push('/')
                   }).catch(err=>{
                       Toast.fail('登录状态保存失败')
                       console.log(err)
                   })
                   
                    
                }else{
                    Toast.fail('登录失败')
                    this.openLoading = false;
                }
               })
               .catch((error)=>{
                    Toast.fail('登录失败')
                    this.openLoading=false
               })
           },
           //****表单验证方法
           checkForm(){
              let isOk = true
              if(this.username.length<5){
                  this.usernameErrorMsg = "用户名不能少于5位"
                  isOk=false
              }else{
                  this.usernameErrorMsg = ''
              } 

              if(this.password.length<6){
                  this.passwordErrorMsg = '密码不能少于6位'
                  isOk = false
              }else{
                  this.passwordErrorMsg = ''
              }

              if(this.sms!=this.smsCode){
                  this.smsErrorMsg = '验证码错误'
                  isOk = false
              }else{
                  this.smsErrorMsg = ''
              }

              return isOk
           } 

       }, 
    }
</script>

<style scoped>
    .sms{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
    }
    .sms-field{

    }
    .sms-img{
        width: 100px;
        height: 40px;
    }
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:80px;
    }
    .register-button{
        padding-top:10px;
    }
</style>