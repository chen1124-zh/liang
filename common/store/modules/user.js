import {
  // getLogin,
  // miniOauth,
  // getUserInfo,
  // getFromUser,
  // editUserInfo,
  // userPasswordAuth,
  // weLogin,
} from '@/apis/index.js'
// import constant from '@/common/constant.js'
// import util from '@/common/util.js'

const keyMap = {
  userInfo: 'userInfo',
  token: 'token',
  locationData: 'locationData'
}
const user = {
  state: {
    userInfo: uni.getStorageSync(keyMap.userInfo) || {},
    token: uni.getStorageSync(keyMap.token) || null,
    AdShow: 0,
    active: 0,
    total_sales: 0,
    team_order_count: 0,
    team_order_history: 0,
    total_commission: 0,
    order_commission: 0,
    paper_img: '',
	phone:"",
    locationData: uni.getStorageSync(keyMap.locationData) || {},
	page_params: {}
  },

  mutations: {
    SET_PAPER_IMG: (state, value) => {
      state.paper_img = value
    },
	SET_PHONE: (state, value) => {
		state.phone = value
		// console.log(value)
	},
    SET_TEAM: (state, teamInfo) => {
      state[teamInfo.key] = teamInfo.val
    },
    SET_USER_INFO: (state, userInfo) => {
      uni.setStorageSync(keyMap.userInfo, userInfo)
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      uni.setStorageSync(keyMap.token, token)
      state.token = token
    },
    SET_AD_SHOW: (state, value) => {
      state.AdShow = value
    },
    SET_ACTIVE: (state, value) => {
      state.active = value
    },
    setLocationData(state, value) {
      state.locationData = value
      uni.setStorageSync(keyMap.locationData, value)
    },
	SET_PAGE_PARAMS: (state, value) => {
	  state.page_params = value
	},
  },
  actions: {
    /**
     * @description 当前这个登录方法, 因原有的登录模块被移除而废弃
     */
    // oauthLogin({
    //   commit
    // }, loginInfo) {
    //   return new Promise((resolve, reject) => {
    //     userPasswordAuth({
    //       phone: loginInfo.phone,
    //       password: loginInfo.password,
    //       auth_type: loginInfo.auth_type,
    //     }).then(res => {
    //       commit('SET_TOKEN', res.data.token)
    //       resolve()
    //       uni.login({
    //         provider: 'weixin',
    //         success: function(loginRes) {
    //           // console.log(loginRes);
    //           getLogin({
    //             code: loginRes.code,
    //             phone: loginInfo.phone,
    //             auth_type: 'wechat_mini',
    //             // app_id: constant.appId
    //           }).then(res => {
				//   console.log("editUserInfo")
    //             editUserInfo({
    //               // app_id: constant.appId,
    //               nickname: loginInfo.detail.userInfo.nickName,
    //               avatar_url: loginInfo.detail.userInfo.avatarUrl,
    //               gender: loginInfo.detail.userInfo.gender
    //             }).then(res => {
    //               getUserInfo().then(res => {
				// 	   console.log("editUserInfo")
    //                 commit('SET_USER_INFO', res.data.user_info)
    //                 // if (!util.isNullStr(loginInfo.userId)) {
    //                 // 	getFromUser({
    //                 // 		fromUser: loginInfo.userId,
    //                 // 		appId: constant.appId,
    //                 // 		userId: res.data.user_info.id
    //                 // 	}).then(result => {
    //                 // 		resolve()
    //                 // 	}).catch(err => {
    //                 // 		reject(error)
    //                 // 	})
    //                 // } else {
    //                 // 	resolve()
    //                 // }
    //               }).catch(error => {
    //                 reject(error)
    //               })
    //             }).catch(error => {
    //               reject(error)
    //             })

    //           }).catch(error => {
    //             reject(error)
    //           })
    //         },
    //         fail: function(error) {
    //           reject(error)
    //         }
    //       })
    //     }).catch(err => {
    //       reject(err)
    //     })

    //   })
    // },
    /**
     * @description 登录
     */
  //   async login({
  //     commit,
  //     dispatch
  //   }) {
  //     //获取code
  //     let [loginError, {
  //       code,anonymousCode
  //     }] = await uni.login({
		// //#ifdef MP-TOUTIAO
		// provider: 'toutiao',
		// //#endif
  //     })
	 //  let loginData = {}
	 //  //#ifdef MP-WEIXIN
	 //  loginData = {
	 //    code,
	 //    auth_type: 'wechat_mini'
	 //  }
	 //  //#endif
	 //  //#ifdef MP-TOUTIAO
	 //  loginData = {
	 //    code,
	 //    anonymous_code: anonymousCode
	 //  }
	  
	 //  //#endif
	 //  let res = await getLogin(loginData)
		// console.log(res)
  //     commit('SET_TOKEN', res.data.token)
  //     dispatch('getUserInfo')
  //   },
  //   //授权个人信息
  //   async authorize() {
  //     let [error, {
  //       cancel,
  //       confirm
  //     }] = await uni.showModal({
  //       title: '授权',
  //       content: '是否前往授权?',
  //     })

  //     if (confirm) {
  //       uni.navigateTo({
  //         url: '/pages/authorize/index',
  //       })
  //     } else if (cancel) {
  //       uni.reLaunch({
  //         url: '/pages/tabbar/index',
  //       })
  //     }
  //   },
  //   getUserInfo({
  //     commit
  //   }, userInfo) {
  //     return new Promise((resolve, reject) => {
  //       getUserInfo().then(res => {
  //         commit('SET_USER_INFO', res.data.user_info)
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   }
  }
}

export default user