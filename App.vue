<script>
	import Vue from 'vue'
	import store from '@/common/store/index.js'
	import {
	  getUserInfo
	} from '@/apis/index.js'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					store.commit('SET_CUSTOM_BAR', Vue.prototype.CustomBar)
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			if(!this.$store.getters.userInfo && this.$store.getters.token) {
				getUserInfo({accesstoken:this.$store.getters.token}).then(res => {
					this.$store.commit('SET_USER_INFO', res.data)
				})
			}
			console.log('App Launch')
		},
		onShow: function(e) {
			// console.debug(e)
			// if (!this.$store.getters.token) {
			// 	this.$store.commit("SET_PAGE_PARAMS", e.query)
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	});
			// }
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import "uni.scss"; */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	page {
		background-color: white;
	}
	.p-relative {
		position: relative;
	}
	.width-fill{
		width: 100%;
	}
	.height-fill {
		height: 100%;
	}
	.text-top-title {
		font-size: 40rpx;
	}
</style>
