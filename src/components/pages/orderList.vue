<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/Member')"
    />
    <van-list>
      <div v-for="item in orderList" :key="item.id" class="order-item">
        <div class="title">{{item.name}}</div>
        <div class="value" v-if="item.goods[0]">{{item.goods[0].slice(0,4)}}等{{item.goods.length}}件商品</div>
        <van-button type="danger" @click="deleOrder(item.id)">删除</van-button>
      </div>
    </van-list>
    <div style="text-align:center;" v-if="orderList.length==0">暂无订单</div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Dialog, Toast } from 'vant'

export default {
  name: 'orderList',
  data() {
    return {
      orderList:[]
    }
  },
  created() {
    this.getList();
  },
  methods: {
    deleOrder(id){
      let userName = JSON.parse(localStorage.userInfo).userName
      Dialog.confirm({
        title: '提示',
        message: '确定删除？'
      }).then(() => {
        axios({
          url:url.delUserOrders,
          method:'post',
          data:{userName,id}
        }).then(res=>{
          if(res.data.code==200&&res.data.message){
            Toast.success('删除成功')
            this.getList()
          }else{
            Toast.fail('删除失败')
          }
        }).catch(()=>{
          
        })
        // on confirm
      })
    },
    getList(){
      let self = this
      let userName = JSON.parse(localStorage.userInfo).userName
      
      axios({
        url:url.getUserOrders,
        method:'post',
        data:{userName:userName}
      }).then(res=>{
        if(res.data.code==200&&res.data.message){
          self.orderList = res.data.message
        }
      })
    }
  }
}
</script>

<style scoped>
.order-item{
  display:flex;
  background:white;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.order-item .title{

}
.order-item .value{
  color: gray;
  font-size: 14px;
}
</style>