import Vue from 'vue'
import App from './App'
import Request from '@/js_sdk/luch-request/luch-request/index.js'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import * as $apis from './apis/index.js'
import $mRouter from './common/router.js'
import $mUtils from './common/utils.js'
import $mRoutesConfig from './config/routes.config.js'
import $mConfig from "./config/index.config.js"
import store from './common/store'


Vue.config.productionTip = false
Vue.prototype.$http = new Request({baseURL: 'http://ny.judexinxi.cn'});


Vue.prototype.$store = store;

Vue.prototype.$apis = $apis;

Vue.prototype.$mRouter = $mRouter;

Vue.prototype.$mRoutesConfig = $mRoutesConfig;

Vue.prototype.$mUtils = $mUtils;

Vue.prototype.$mConfig = $mConfig;

$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	if (to.route.path === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.redirectTo({
			url: $mUtils.objParseUrlAndParam($mRoutesConfig.main.path, to.query)
		})
		return; 
	}

	// 过滤需要权限的页面
	if (to.route.requiresAuth) {

		if (store.getters.token) {
			// 已经登录
			uni[navType]({
				url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			} else {
				uni.navigateTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
