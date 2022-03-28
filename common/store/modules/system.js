
const system = {
	state: {
		statusBar: 25,
		customBar: 45,
		systemInfo: {
			fontSizeSetting:17,
			platform:'android'
		}
	},

	mutations: {
		SET_STATUS_BAR: (state, statusBar) => {
			state.statusBar = statusBar
		},
		SET_CUSTOM_BAR: (state, customBar) => {
			console.debug('store set customBar',customBar)
			state.customBar = customBar
		},
		SET_SYSTEM_INFO: (state, e) => {
			state.systemInfo = e
		}
	},

	actions: {
		getSyetemInfo({
			commit
		}) {
			uni.getSystemInfo({
				success: (e) => {
					let statusBar = 0
					let customBar = 0
					// #ifdef MP
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45
					if (e.platform === 'android') {
						customBar = e.statusBarHeight + 50
					}
					// #endif


					// #ifdef MP-WEIXIN
					statusBar = e.statusBarHeight
					// @ts-ignore
					const custom = wx.getMenuButtonBoundingClientRect()
					customBar = 44;
					if (e.platform.toLowerCase() == 'devtools') {
						customBar = 44;
					}
					if (e.platform.toLowerCase() == 'android') {
						customBar = 48;
					}
					// #endif

					// #ifdef MP-ALIPAY
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + e.titleBarHeight
					// #endif


					// #ifdef APP-PLUS
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45
					// #endif


					// #ifdef H5
					statusBar = 0
					customBar = e.statusBarHeight + 45
					// #endif

					// 这里你可以自己决定存放方式，建议放在store中，因为store是实时变化的
					commit('SET_STATUS_BAR', statusBar)
					commit('SET_CUSTOM_BAR', customBar)
					commit('SET_SYSTEM_INFO', e)
				}
			})
		}
	}
}

export default system
