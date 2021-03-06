const url = require('url')
const fs = require('fs')
const path = require('path')

// 遍历读取目录内容方法

const walk = require('./walk')

// 封装目录内容

function dir(url, reqPath) {
	// 遍历读取当前目录下的文件、子目录

	const contentList = walk(reqPath)

	let html = `<ul>`

	for (const [index, item] of contentList.entries()) {
		html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>`
	}
	html = `${html}</ul>`

	return html
}

module.exports = dir
