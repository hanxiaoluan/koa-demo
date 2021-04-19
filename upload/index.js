const Koa = require('koa')
const path = require('path')
const app = new Koa()

const { uploadFile } = require('./util/upload')
app.use(async ctx => {
	if (ctx.url === '/' && ctx.method === 'GET') {
		// 当是get请求时返回表单页面
		const html = `
        <h1>koa2 upload demo</h1>
        <form method="POST" action="/upload.json" enctype="multipart/form-data">
          <p>file upload</p>
          <span>picName:</span><input name="picName" type="text" /><br/>
          <input name="file" type="file" /><br/><br/>
          <button type="submit">submit</button>
        </form>
      `

		ctx.body = html
	} else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
		// 上传文件请求处理
		let result = { success: false }
		const serverFilePath = path.join(__dirname, 'upload-files')

		// 上传文件事件
		result = await uploadFile(ctx, {
			fileType: 'album',
			path: serverFilePath
		})

		ctx.body = result
	} else {
		ctx.body = '<h1>404!!! o(╯□╰)o</h1>'
	}
})

app.listen(4000, () => {
	console.log('demo is starting at port 4000')
})
