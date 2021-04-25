const mysql = require('mysql')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'luanhanxiao'
})

connection.connect(err => {
	if (err) {
		console.error('连接失败' + err.stack)
		return
	}

	console.log('连接成功 id' + connection.threadId)
})
