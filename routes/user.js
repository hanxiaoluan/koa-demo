const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

class UserController {
	static async getList(ctx) {
		const validator = ctx.validate(ctx.query, {

		})
	}
}
