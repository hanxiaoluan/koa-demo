const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

app.use(views(path.join(__dirname, './view/'), {
	extension: 'ejs'
}))

app.use(async ctx => {
	const title = 'hellow koa2'
	await ctx.render('index', {
		title
	})
})

app.listen(4000, () => {
	console.log('[demo] ejs is starting at port 4000')
})
