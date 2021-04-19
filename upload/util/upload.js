const { inspect } = require('util')
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @return {boolean}
 */

function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		// eslint-disable-next-line no-unused-vars
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname)

			return true
		}
	}
}

/**
 * 获取上传文件的后缀名
 * @param {string} fileName
 * @return {string} 文件后缀名
 */

function getSuffixName(fileName) {
	const nameList = fileName.split('.')
	return nameList[nameList.length - 1]
}

/** 上传文件
 * @param {object} ctx koa上下文
 * @param {object} options 文件上传参数 fileType 文件类型
 * @returns {promise}
 */
function uploadFile(ctx, options) {
	const req = ctx.req
	const res = ctx.res
	const busboy = new Busboy({ headers: req.headers })

	// 获取类型
	const fileType = options.fileType || 'common'
	const filePath = path.join(options.path, fileType)

	mkdirsSync(filePath)

	return new Promise((resolve, reject) => {
		console.log('文件上传中')
		const result = {
			success: false,
			formData: {}
		}

		// 解析请求文件事件
		busboy.on('file', function(filedname, file, filename, encoding, mimetype) {
			const fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(fileName)
			const _uploadFilePath = path.join(filePath, fileName)
			const saveTo = path.join(_uploadFilePath)

			// 文件保存到对应路径
			file.pipe(fs.createWriteStream(saveTo))

			file.on('end', function() {
				result.success = true
				result.message = '文件上传成功'
				console.log('文件上传成功')
			})
		})

		// 解析表单中其他字段信息
		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
			console.log('表单字段数据 [' + fieldname + ']:value: ' + inspect(val))
			result.formData[fieldname] = inspect(val)
		})

		// 解析结束事件
		busboy.on('finish', function() {
			console.log('文件上传结束')
			resolve(result)
		})

		// 解析错误事件
		// eslint-disable-next-line handle-callback-err
		busboy.on('error', function(err) {
			console.log('文件上错误')
			reject(result)
		})

		req.pipe(busboy)
	})
}

module.exports = {
	uploadFile
}
