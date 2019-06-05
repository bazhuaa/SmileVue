const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})

router.post('/register',async(ctx)=>{
   
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})
router.get('/userMsg',async(ctx)=>{
    try{
        let userName = ctx.request.body.userName
        const user = mongoose.model('User')
        let result = await user.findOne({userName:userName}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
// 订单
router.post('/getUserOrders',async(ctx)=>{
    try{
        let userName = ctx.request.body.userName
        const user = mongoose.model('User')
        let result = await user.findOne({userName:userName}).exec()
        ctx.body={code:200,message:result.orderList}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
// 删除
router.post('/delUserOrders',async(ctx)=>{
    try{
        let userName = ctx.request.body.userName
        let id = ctx.request.body.id*1
        const user = mongoose.model('User')
        let result = await user.update({userName:userName},{$pull:{orderList:{id:id}}})
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
// 添加订单
router.post('/addUserOrders',async(ctx)=>{
    console.log(ctx.request.body)

    try{
        
        let userName = ctx.request.body.userName
        let goods = JSON.parse(ctx.request.body.goods).data
        let date = new Date()
        let dateStr = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'订单'
        let id = parseInt( Math.random()*10000000)
        const user = mongoose.model('User')
        let result = await user.update({userName: userName}, {$addToSet:{orderList:{id:id,name:dateStr,goods:goods}}});
        ctx.body={code:200,message:'添加成功'}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})
router.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password

    //引入User的model
    const User = mongoose.model('User')

    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newUser = new User()
            await newUser.comparePassword(password,result.password)
            .then(isMatch=>{
                if(isMatch){
                    ctx.body={code:200,message:result}
                }else{
                    ctx.body={code:400,message:'密码错误'}
                }
            })
            .catch(error=>{
                console.log(error)
                ctx.body={code:500,message:error}
            })
        }else{
            ctx.body={code:400,message:'用户名不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })

})

module.exports =router