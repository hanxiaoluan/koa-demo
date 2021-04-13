const Koa = require('koa')
const path = require('path')
const mimes = require('./util/mimes')
const content = require('./util/content')
const app = new Koa()

// 静态资源相对于相对入口文件index.js的路径
const staticPath = './static/'

// 解析资源类型

function parseMime(url) {
	// 获取文件名的后缀
	let extName = path.extname(url)
	extName = extName ? extName.slice(1) : 'unknown'
	return mimes[extName]
}

app.use(async ctx => {
	// 获取静态资源在本地的绝对路径
	const fullStaticPath = path.join(__dirname, staticPath)

	// 获取静态资源内容，有可能是文件内容，目录或者404
	const _content = await content(ctx, fullStaticPath)

	// 解析请求内容的类型
	const _mime = parseMime(ctx.url)

	// 如果有对应的文件类型，就配置上下文的类型
	if (_mime) {
		ctx.type = _mime
	}

	// 输出静态资源内容
	if (_mime && _mime.indexOf('image/') >= 0) {
		ctx.res.writeHead(200)
		ctx.res.write(_content, 'binary')
		ctx.res.end()
	} else {
		// 输入其他输出文本
		ctx.body = _content
	}
})

app.listen(4000, () => {
	console.log('demo is static-server is starting at port 3000')
})
