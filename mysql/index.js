const fs = require('fs')
const getSqlContentMap = require('./util/get-sql-content-map')
const { query } = require('./util/db')

// 打印脚本执行日志
const eventLog = function(err, sqlFile, index) {
	if (err) {
		console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
	} else {
		console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !)`)
	}
}

// 获取所有sql脚本内容
const sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async() => {
	for (const key in sqlContentMap) {
		const sqlShell = sqlContentMap[key]
	}
}
