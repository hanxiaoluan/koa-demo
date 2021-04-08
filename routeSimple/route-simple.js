const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()

/**
 * 用Promise封装异步方法
 * @param {String} page html 文件名称
 * @return {promise}
 */

function render(page) {
	return new Promise((resolve, reject) => {
		const viewUrl = `${path.resolve(__dirname)}/view/${page}`
		fs.readFile(viewUrl, 'binary', (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

/**
 * 根据URL获取HTML内容
 * @param {string} url koa2上下文的url,ctx.url
 * @return {string} 获取html文件内容
 */

async function route(url) {
	let view = '404.html'
	switch (url) {
		case '/':
			view = 'index.html'
			break
		case '/index':
			view = 'index.html'
			break
		case '/todo':
			view = 'todo.html'
			break
		case '/404':
			view = '404.html'
			break
		default:
			break
	}

	const html = await render(view)

	return html
}

app.use(async ctx => {
	const url = ctx.request.url
	const html = await route(url)
	ctx.body = html
})
app.listen(4000)

console.log('[demo] route-simple is starting at port 4000')
