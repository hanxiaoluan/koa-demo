const path = require('path')
const fs = require('fs')

// 封装读取目录内容方法
const dir = require('./dir')

// 封装读取文件内容的方法
const file = require('./file')

async function content(ctx, fullStaticPath) {
	const reqPath = path.join(fullStaticPath, ctx.url)

	const exist = fs.existsSync(reqPath)

	let content = ''

	if (!exist) {
		content = '404 Not Found! o(╯□╰)o！'
	} else {
		const stat = fs.statSync(reqPath)

		if (stat.isDirectory()) {
			content = dir(ctx.url, reqPath)
		} else {
			content = file(reqPath)
		}
	}

	return content
}

module.exports = content
