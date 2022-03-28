<template>
	<view>
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">登录</text>
			</view>
		</cu-custom>
		<view class="content">
			<view class="content_yuan">
				<image style="width: 100%;height: 100%;" src="../../static/img/user.png" mode=""></image>
			</view>
			<p class="p">微信授权登录</p>
			<view class="info">
				<p>为了给您更好地提供服务</p>
				<p>我们将申请获取您的头像昵称授权</p>
			</view>
		</view>
		<view class="button">
			<view class="content_bottom">
				允许授权
				<!-- <button type="button" open-type="getUserInfo" @getuserinfo="getUserInfoTap" style="width: 100%;height: 90rpx;position: absolute;top: 0;opacity: 0;"></button> -->
				<button type="button" open-type="getUserInfo" @click="getUserInfoTap"
					style="width: 100%;height: 90rpx;position: absolute;top: 0;opacity: 0;"></button>
			</view>

			<view class="content_bottom" @click="jumpGo" style="opacity: .5;margin-top: 24rpx;">
				残忍拒绝
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	import {
		postLogin,
		getUserInfo
	} from "@/apis/index.js"
	export default {
		data() {
			return {
				background: {
					backgroundColor: "#2793FF",
				},
				loginRes: null
			};
		},
		onLoad() {
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					this.loginRes = loginRes;
				}
			});
		},
		methods: {
			...mapActions(['login', "editUserInfo", "getUserInfo"]),
			getUserInfoTap() {
				uni.showLoading({
					title: '登录中',
					mask: true
				});
				let that = this
				uni.getUserProfile({
					desc: '用户可见',
					lang: 'zh_CN',
					success: (res) => {
						console.debug('getUserInfoTap getUserInfo', res)
						this.$store.commit("SET_USER_INFO", res.userInfo)
						this.userInfo = res.userInfo
						this.active = this.userInfo.avatarUrl
						postLogin({
							code: that.loginRes.code,
							iv: res.iv,
							encryptedData: res.encryptedData
						}).then(postLoginRes => {
							if (postLoginRes.code === 200) {
								this.$store.commit("SET_TOKEN", postLoginRes.data.accesstoken)
								uni.hideLoading()
								uni.showToast({
									title: '登录成功'
								})
								getUserInfo({
									accesstoken: postLoginRes.data.accesstoken
								}).then(userInfoRes => {
									this.$store.commit('SET_USER_INFO', userInfoRes.data)
								});
								let time = setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							}
						}).catch(err => {
							uni.hideLoading()
							console.error(err)
							uni.showToast({
								title: err.err.msg,
								icon: 'none'
							})
						})
					},
					fail: err => {
						uni.hideLoading()
						console.debug('getUserProfile fail', err)
					}
				})
			},
			jumpGo() {
				// uni.navigateBack({
				// 	delta: 1
				// });
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.navbar {
		width: 100%;
		color: rgba(255, 255, 255, 1);
		font-size: 40rpx;
	}

	.content {
		width: 100%;
		height: 100%;

		.content_yuan {
			width: 492rpx;
			height: 492rpx;
			border-radius: 50%;
			margin: 60rpx auto 0;
			// background-color: rgba(191, 197, 210, 1);
		}

		.p {
			width: 100%;
			text-align: center;
			color: rgba(39, 147, 255, 1);
			font-size: 40rpx;
			margin: 30rpx 0 20rpx;
			font-weight: bold;
		}

		.info {
			width: 100%;
			text-align: center;
			color: rgba(153, 153, 153, 1);

			p {
				line-height: 48rpx;
			}
		}
	}

	.button {
		width: 100%;
		position: absolute;
		bottom: 20rpx;

		.content_bottom {
			width: 92%;
			text-align: center;
			margin: 0 auto;
			height: 90rpx;
			border-radius: 10rpx;
			background-color: rgba(39, 147, 255, 1);
			font-size: 34rpx;
			font-weight: bold;
			line-height: 90rpx;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
