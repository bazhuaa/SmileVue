<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img src="../../assets/images/avatar.png" class="top-img" />
           <div v-if="!isLogin">未登录</div>
           <div v-else>{{this.name}}</div>
        </div>
        <div class="login">
            <div v-if="!isLogin"><van-button  type="primary" @click="$router.push('/login')">我要登录</van-button></div>
            <div v-if="!isLogin"><van-button type="primary" @click="$router.push('/register')">我要注册</van-button></div>
            <!-- <div v-if="!isLogin"><van-button type="info" @click="insertData">导入数据</van-button></div> -->
        </div>
        <div>
            <van-cell-group style="text-align:center;">
                <van-cell title="我的订单" is-link  @click="toMyOrder"/>
                <van-cell title="联系我们" is-link  @click="contact"/>
                <van-button  v-if="isLogin" type="primary" @click="logout">退出登录</van-button>

            </van-cell-group>

        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import { Toast } from 'vant'
    import url from '@/serviceAPI.config.js'
    export default {
        data(){
            return{
                name:'未登录',
                isLogin:false
            }
        },
        created(){
            if(localStorage.userInfo){
                this.name = JSON.parse(localStorage.userInfo).userName || '未登录'
                this.isLogin = true
            }
        },
        methods:{
            contact(){
                Toast('感谢使用')
            },
            toMyOrder(){
                if(!localStorage.userInfo){
                    Toast.fail('请登陆')
                    return
                }
                this.$router.push('/orderList')
            },
            logout(){
                localStorage.removeItem('userInfo')
                // localStorage.removeItem('cartInfo')
                this.isLogin=false
            },
            insertData(){
                axios({
                   url:url.insertAllGoodsInfo,
                   method: 'get',
               })
               .then(response=>{
                    Toast.fail('正在导入，请刷新')
               })
            }
        }
    }
</script>

<style scoped>
    .top-img{
        width:70px;
        height: 70px;
        border-radius: 50px;
        background: #EEA2AD;
    }
    .top{
        height:6rem;
        text-align: center;
        padding-top:2rem;
        background-color: #EEA2AD;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>