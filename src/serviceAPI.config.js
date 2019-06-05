const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://39.108.170.43:3000/"
const URL ={
    getShopingMallInfo : BASEURL+'index',    //商城首页所有信息
    getGoodsInfo : BASEURL+'getGoodsInfo', 
    registerUser : LOCALURL+'user/register',  //用户注册接口
    login : LOCALURL+'user/login',  //用户登录接口
    getUserOrders : LOCALURL+'user/getUserOrders',  //订单列表
    delUserOrders : LOCALURL+'user/delUserOrders',  //删除订单
    addUserOrders : LOCALURL+'user/addUserOrders',  //添加订单
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    insertAllGoodsInfo : LOCALURL+'goods/insertAllGoodsInfo',  //导入商品信息
    getCateGoryList : LOCALURL+'goods/getCateGoryList',  //得到大类信息
    getCateGorySubList : LOCALURL+'goods/getCategorySubList',  //得到小类信息
    getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID',  //得到小类商品信息
    searchGoods : LOCALURL+'goods/searchGoods',  //搜索商品信息
}

module.exports = URL
