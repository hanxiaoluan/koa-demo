const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
	const url = ctx.request.url
	ctx.body = url
})

app.listen(4000)
