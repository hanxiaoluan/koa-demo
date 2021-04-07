const Koa = require('koa')
const app = new Koa()
const loggerAsync = require('./middlerware/logger-async')

app.use(loggerAsync())

app.use((ctx) => {
	ctx.body = 'hello koa2'
})
app.listen(4000)
console.log('[demo] start-quick is starting at port 4000')
