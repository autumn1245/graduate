const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

app.use(cors())
    // middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


app.use(async(ctx, next) => {
    const start = new Date()
        // await next()
    const ms = new Date() - start
    ctx.params = {
        ...ctx.request.body,
        ...ctx.query,
    };
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms  ${JSON.stringify(ctx.params)}`)
    await next();

    // const req = ctx.request
    // const url = req.url	// 请求的url
    // const method = req.method	// 请求的方法
    // let post_data = ''
    // ctx.req.addListener('data', (postDataChunk) => {
    //     console.log('收到post数据 ---->', postDataChunk)
    //     post_data += postDataChunk
    // })
    // ctx.req.addListener('end', () => {
    //     console.log('接收post数据完毕 ---->', post_data)
    // })
    // ctx.body = {
    //     url,
    //     method,
    // }
    // console.log('ctx.body=========',ctx.body)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// const app = new Koa()
// context binding...
const context = require('./utils/context')
const router = require('./routes/users')
Object.keys(context).forEach(key => {
    app.context[key] = context[key] // 绑定上下文对象
})


module.exports = app
console.log('运行在3080端口-------')
app.listen(3080);