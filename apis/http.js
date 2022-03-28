import store from "@/common/store"
function HTTP(obj, config) {

	let defaultConfig = {
		isRes: false,
		loading: false
	}

	config = { ...defaultConfig,
		...config
	}


	// 如果需要显示loading,mask防止点击穿透
	config.loading && uni.showLoading({
		title: '加载中',
		mask: true
	});

	return new Promise((resolve, reject) => {

		let options = {
			url: "",
			method: "GET",
			data: {},
			dataType: "json",
			header: {
				"content-type": "application/json",
				"X-requested-With": "XMLHttpRequest"
			},
			success: (res) => {
				console.log("HTTP请求结果：",res.data.msg)
				uni.hideLoading();
				// 状态码为200
				if (res.statusCode == 200) {
					let data = res.data;
					resolve(data)
					//自动校验用户是否登录过期
					// if (data.code == "01") {
					// 	store.dispatch("reLogin");
					// 	return;
					// }

					//返回 { code:10000,msg:"消息",data:[] }
					// if (config.isRes) {
					// 	resolve(data)
					// }
					// 返回 data:[]
					// else {
					// 	if (data.code == "00") {
					// 		resolve(data.data || true)
					// 	} else {
					// 		wx.showToast({
					// 			title: data.msg,
					// 			icon: "none",
					// 			duration: 2000
					// 		})
					// 		reject(data.msg);
					// 	}
					// }
				} else {
					reject({msg:"HTTP:状态码异常！",err: res.data});
				}
			},
			fail: (err) => {
				uni.hideLoading();
				uni.showToast({
					title: "网络异常，请稍后再试!",
					icon: "none",
				})
				reject("网络异常，请稍后再试!");
			},
			complete: () => {}
		}

		options = { ...options,
			...obj
		};
		
		// 没有token,则调用login获取token, 登录接口不获取token
		// console.log('token',store.getters.token)
		if (store.getters.token !== null && store.getters.token !== '') {
			// const _token = {'Authorization': `Bearer null`}
			const _token = {
				'Authorization': `${store.getters.token}`
			}
			const _accesstoken = {
				'accesstoken': `${store.getters.token}`
			}
			options.header = Object.assign({}, options.header, _token)
			options.data = Object.assign({}, options.data, _accesstoken)
		}
		
		const OPENID = uni.getStorageSync("openId");
		if (OPENID) options["header"]["openId"] = OPENID;

		if (options.url && options.method) {
			wx.request(options);
		} else {
			wx.showToast({
				title: 'HTTP：缺失参数',
				icon: "none",
				duration: 2000
			})
		}
	})

}



export default {
	GET(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "GET"
		}, config);
	},
	POST(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "POST"
		}, config);
	},

	POSTformdata(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "POST"
		}, config);
	}
}
