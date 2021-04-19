const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
	if (ctx.url === '/index') {
		ctx.cookies.set(
			'cid',
			'hello world',
			{
				domain: 'localhost',
				path: '/index',
				maxAge: 10 * 60 * 1000,
				expires: new Date('2021-05-01'),
				httpOnly: false,
				overwrite: false
			}
		)

		ctx.body = 'cookie is ok'
	} else {
		ctx.body = 'hello world'
	}
})

app.listen(4000, () => {
	console.log('[demo] cookie is starting at port 4000')
})
