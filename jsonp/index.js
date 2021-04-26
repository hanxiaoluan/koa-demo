const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
	// 如果jsonp的请求为get
	if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
		// 获取jsonp的callback
		const callbackName = ctx.query.callback || 'callback'
		const returnData = {
			success: true,
			data: {
				text: 'this is a jsonp api',
				time: new Date().getTime()
			}
		}

		// jsonp的script字符串
		const jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

		// 用text/javascript ，让字符串支持跨域获取
		ctx.type = 'text/javascript'

		ctx.body = jsonpStr
	} else {
		ctx.body = 'hello jsonp'
	}
})
app.listen(3000, () => {
	console.log('[demo] jsonp is starting at port 3000')
})
