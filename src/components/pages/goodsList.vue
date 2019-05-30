<template>
  <div>
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
    />
    <van-list>
        <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList" :key="index">
            <div class="list-item-img">
                <img :src="item.IMAGE1" 
                width="100%"
                :onerror="errorImg"                                    
                  />
            </div>
            <div class="list-item-text">
                <div>{{item.NAME}}</div>                                    
                <div>￥{{item.ORI_PRICE | moneyFilter}}</div>                                    
              </div>
        </div>
    </van-list>
    <div style="text-align:center">
      共{{goodsList.length}}个商品
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
      name: 'index',
      data() {
        return {
          goodsList:[],
          listLen:1,
          errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"'
        }
      },
      filters:{
        moneyFilter(money){
            return toMoney(money)
        }
      },
      computed:{
        keyword(){
          return this.$route.query.keyword
        }
      },
      created() {
        console.log(this.$route)
        this.getList()
      },
      methods: {
        //跳转到商品详细页
        goGoodsInfo(id){
          this.$router.push({name:'Goods',params:{goodsId:id}})
        },
        getList(){
          let self = this
          axios({
            url:url.searchGoods,
            method:'post',
            data:{keyword:this.keyword}
          }).then(res=>{
            if(res.data.code==200&&res.data.message){
              self.goodsList = res.data.message
            }
          })
        }
      }
  }
</script>

<style scoped>
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>