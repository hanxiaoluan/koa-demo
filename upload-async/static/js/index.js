
(function() {
	const btn = document.getElementById('J_UploadPictureBtn')
	const progressElem = document.getElementById('J_UploadProgress')
	const previewElem = document.getElementById('J_PicturePreview')

	btn.addEventListener('click', function() {
		uploadAction({
			success: function(result) {
				console.log(result)
				if (result && result.success && result.data && result.data.pictureUrl) {
					previewElem.innerHTML = '<img src="' + result.data.pictureUrl + '" style="max-width: 100%">'
				}
			},
			progress: function(data) {
				if (data && data * 1 > 0) {
					progressElem.innerText = data
				}
			}
		})
	})

	/**
     * 类型判断
     * @type {Object}
     */

	const UtilType = {
		isPrototype: function(data) {
			return Object.prototype.toString.call(data).toLowerCase()
		},

		isJSON: function(data) {
			return this.isPrototype(data) === '[object object]'
		},

		isFunction: function(data) {
			return this.isPrototype(data) === '[object object]'
		}
	}

	/**
     * form表单上传请求事件
     * @param {object} options 请求参数
     */
	function requestEvent(options) {
		try {
			const formData = options.formData
			const xhr = new XMLHttpRequest()
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					options.success(JSON.parse(xhr.responseText))
				}
			}
			xhr.upload.onprogress = function(event) {
				const loaded = event.loaded
				const total = event.total
				const per = Math.floor(100 * loaded / total)
				options.progress(per)
			}
			xhr.open('post', '/api/picture/upload.json')
			xhr.send(formData)
		} catch (error) {
			options.fail(error)
		}
	}

	/** 上传事件
     * @param {object} options 上传参数
     */
	function uploadEvent(options) {
		let file
		const formData = new FormData()
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('name', 'files')

		input.click()
		input.onchange = function() {
			file = input.files[0]
			formData.append('files', file)

			requestEvent({
				formData,
				success: options.success,
				fail: options.fail,
				progress: options.progress
			})
		}
	}
	/**
     * @param {object} options 上传参数
     */

	function uploadAction(options) {
		if (!UtilType.isJSON(options)) {
			console.log('upload options is null')
			return
		}

		const _options = {}

		_options.success = UtilType.isFunction(options.success) ? options.success : function() {}
		_options.fail = UtilType.isFunction(options.fail) ? options.fail : function() {}
		_options.progress = UtilType.isFunction(options.progress) ? options.progress : function() {}

		uploadEvent(_options)
	}
})()
