const { inspect } = require('util')
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param {string} dirname 目录地址
 * @return {boolean}
 */

function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		if (fs.mkdirSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname)
			return true
		}
	}
}

/**
 * 获取文件的后缀名
 * @param {string} fileName
 * @return {string}
 */

function getSuffixName(fileName) {
	const nameList = fileName.split('.')
	return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
	const req = ctx.req
	const res = ctx.res
	const busboy = new Busboy({ headers: req.headers })

	const fileType = options.fileType || 'common'
	const filePath = path.join(options.path, fileType)
	mkdirsSync(filePath)

	return new Promise((resolve, reject) => {
		console.log('文件上传中')
		const result = {
			success: false,
			message: '',
			data: null
		}
		busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
			const fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(fileName)
			const _uploadFilePath = path.join(filePath, fileName)
			const saveTo = path.join(_uploadFilePath)

			file.pipe(fs.createWriteStream(saveTo))
			file.on('end', () => {
				result.success = true
				result.message = '文件上传成功'
				result.data = {
					pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
				}
				console.log('文件上传成功')
				resolve(result)
			})
		})

		busboy.on('finish', () => {
			console.log('文件上结束')
			resolve(result)
		})

		busboy.on('error', err => {
			console.log('文件上出错')
			reject(err)
		})

		req.pipe(busboy)
	})
}

module.exports = {
	uploadFile
}
