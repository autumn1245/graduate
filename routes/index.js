const router = require('koa-router')()
const user = require('./users');
const admin = require('./admin')
const upload = require('./upload')
const picture = require('./picture')
// let router = new Router();



router.use(user.routes())
router.use(admin.routes())
router.use(upload.routes())
router.use(picture.routes())



// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2! ----------'
//   })
// })

// router.get('/login',async(ctx,next)=>{
//   await ctx.render('login',{
//     title :'login////login-----'
//   })
// })

// router.get('/register', async (ctx, next) => {
//   await ctx.render('register', {
//     title: 'register/register-----'
//   })
// })


// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router