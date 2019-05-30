<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="cart-title">
            <van-button v-if="!isEmpty" size="small"  type="danger" @click="clearCart" plain>
                清空购物车
            </van-button>
            <span v-if="isEmpty">购物车是空的</span>
        </div>
        <!--显示购物车中的商品-->
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img">
                    <img :src="item.image" width="100%" />
                </div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div>
                        ￥{{item.price | moneyFilter}}
                    </div>
                    <div>
                        x{{item.count}}
                    </div>
                    <div class="allPrice">
                        ￥{{item.price*item.count | moneyFilter}}
                    </div>
                </div>
            </div>
        </div>
        
        <!--显示总金额-->
        <div class="totalMoeny" v-if="!isEmpty">
            商品总价:￥{{totalMoney | moneyFilter}}
        </div>

        <van-button v-if="!isEmpty" type="primary" @click="addOrder" style="float:right;margin-top:10px;" >
            提交订单
        </van-button>

    </div>
    
</template>

<script>
    import { toMoney} from '@/filter/moneyFilter.js'
    import { Dialog, Toast } from 'vant'
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    export default {
       data() {
           return {
               cartInfo: [] ,
               isEmpty: false ,
           }
          
       }, 
       created(){
           this.getCartInfo()
       },
       computed:{
           totalMoney(){
               let allMoney = 0 
               this.cartInfo.forEach((item,index)=>{
                   allMoney += item.price*item.count
               })
              localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney
           }
       },
       filters:{
           moneyFilter(money){
               return toMoney(money)
           }
       },
       methods: {
           addOrder(){
                let userName = JSON.parse(localStorage.userInfo).userName
                let data = this.cartInfo.map(v=>v.name)
                let goods = JSON.stringify({data})
                axios({
                    url:url.addUserOrders,
                    method:'post',
                    data:{userName,goods}
                    }).then(res=>{
                    if(res.data.code==200&&res.data.message){
                        Toast.success('提交成功')
                        this.cartInfo=[]
                    }else{
                        Toast.fail('提交失败')
                    }
                })
           },
            //得到购物车数据的方法
            getCartInfo() { 
                if(localStorage.cartInfo&&localStorage.userInfo){
                    this.cartInfo=JSON.parse(localStorage.cartInfo)
                } 
                console.log(' this.cartInfo:'+JSON.stringify(this.cartInfo))
                this.isEmpty=this.cartInfo.length>0 ?false : true
            
            },
            clearCart(){
                
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            }
        },
    }
</script>

<style scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align:right;
}

.cart-list{
    background-color: #fff;
}
.pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}

.pang-img{
    flex:6;
}
.pang-text{
    flex:14;
    padding-left:10px;
}
.pang-control{
    padding-top:10px;
}
.pang-goods-price{
    flex:4;
    text-align: right;
}
.allPrice{
    color:red;
}
.totalMoeny{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
}
</style>