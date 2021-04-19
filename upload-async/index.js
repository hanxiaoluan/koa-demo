const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const koaStatic = require('koa-static')
const { uploadFile } = require('./util/upload')

const app = new Koa()

app.use(views(path.join(__dirname, './view'), {
	extension: 'ejs'
}))

const staticPath = './static'

app.use(koaStatic(
	path.join(__dirname, staticPath)
))

app.use(async ctx => {
	if (ctx.method === 'GET') {
		const title = 'upload pic async'
		await ctx.render('index', {
			title
		})
	} else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
		let result = { success: false }
		const serverFilePath = path.join(__dirname, 'static/image')

		result = await uploadFile(ctx, {
			fileType: 'album',
			path: serverFilePath
		})

		ctx.body = result
	} else {
		ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
	}
})

app.listen(4000, () => {
	console.log('[demo] upload-pic-async is starting at port 4000')
})
