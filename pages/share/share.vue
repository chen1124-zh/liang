<template>
	<view class="page">
		<!-- 标题栏 -->
		<cu-custom isBack bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">直播间分享</text>
			</view>
		</cu-custom>
		<view class="width-fill height-fill share-bg">
			<image src="../../static/img/share_bg.png" mode="aspectFit"></image>
		</view>
		<view :style="{height: `calc(100vh - ${CustomBar}px)`}">
			<view class="flex flex-direction height-fill">
				<view class="content-session padding-lr">
					<view class="top-icon">
						<image :src="author_image" mode="aspectFill"></image>
					</view>
					<view class="card">
						<view class="text-center text-xl border-bottom">{{author_name}}</view>
						<view class="padding-lr padding-tb">
							<view class="card-img">
								<image :src="share_image" show-menu-by-longpress mode="aspectFit"></image>
							</view>
						</view>
						<view class="title padding-lr">{{title}}</view>
						<view class="time padding-lr"><text class="padding-right-xs">直播时间:</text>{{start_time_cn}}
						</view>

						<view class="msg-box flex justify-between">
							<view class="flex align-center">
								<view class="round avatar">
									<image class="round" :src="author_image" mode="aspectFill"></image>
								</view>
								<view class="flex align-center padding-left-sm">
									<view>
										<view class="text">长按图片识别二维码</view>
										<view class="text">或微信扫一扫观看直播</view>
									</view>
								</view>
							</view>
							<view class="flex align-center">
								<view class="share-qrcode">
									<image @click="preImg(qrcode_image)" :src="qrcode_image" mode="aspectFill"></image>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view class="bottom-session flex-sub">
					<view class="flex justify-around padding-xl">
						<button class="cu-btn bg-green" @click="saveHttpImg(share_image)">保存到手机</button>
						<button open-type="share" class="cu-btn line-green">分享给好友</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				share_image: '',
				author_name: '',
				author_image: '',
				qrcode_image: '',
				title: '',
				start_time_cn: '',
				id: '',
				page_path: ''
			}
		},
		onLoad(e) {
			this.share_image = e.share_image;
			this.author_image = e.author_image;
			this.qrcode_image = e.qrcode_image
			this.author_name = e.author_name;
			this.title = e.title;
			this.start_time_cn = e.start_time_cn;
			this.id = e.id;
			let pages = getCurrentPages();
			this.page_path = (pages[pages.length - 2]).route; //上个页面路径
		},
		methods: {
			// 分享
			onShareAppMessage(options) {
				console.log('onShareAppMessage')
				var that = this;
				// 设置菜单中的转发按钮触发转发事件时的转发内容
				var shareObj = {
					title: this.title, // 默认是小程序的名称(可以写slogan等)
					path: '/' + this.page_path + '?id=' + this.id, // 默认是当前页面，必须是以‘/’开头的完整路径
					imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
					success: res => {
						// 转发成功之后的回调
						if (res.errMsg == 'shareAppMessage:ok') {}
					},
					fail: () => {
						// 转发失败之后的回调
						if (res.errMsg == 'shareAppMessage:fail cancel') {
							// 用户取消转发
						} else if (res.errMsg == 'shareAppMessage:fail') {
							// 转发失败，其中 detail message 为详细失败信息
						}
					},
					complete: () => {
						// 转发结束之后的回调（转发成不成功都会执行）
					}
				};
				// 来自页面内的按钮的转发
				if (options.from == 'button') {
					// 　　　　var eData = options.target.dataset;
					// 此处可以修改 shareObj 中的内容
					shareObj.path = '/' + this.page_path + '?id=' + this.id;
				}
				// 返回shareObj
				return shareObj;
			},
			//下载网络图片
			saveHttpImg(url) {
				let _t = this;
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							let file = res.tempFilePath;
							_t.save(file)
						}
					}
				});
			},
			//保存图片到本地
			save(url) {
				let _this = this;
				uni.showLoading({
					title: '保存中...'
				});
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: () => {
						uni.hideLoading();
						uni.showToast({
							title: "图片已保存"
						})
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							title: "保存失败"
						});
					}
				});
			},
			// 预览图片
			preImg(url) {
				// console.debug(123123123312)
				uni.previewImage({
					current: 0,
					urls: [url]
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		// background-color: #336ef1;
	}

	.share-bg {
		width: 100vw;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -100;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.content-session {
		padding-top: 157rpx;
		padding-bottom: 20rpx;

		.top-icon {
			width: 160rpx;
			height: 160rpx;
			position: absolute;
			border-radius: 50%;
			left: 50%;
			top: 220rpx;
			z-index: 10;
			transform: translateX(-50%);

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}

	.card {
		position: relative;
		width: 690rpx;
		// height: 821rpx;
		padding-top: 85rpx;
		background-color: white;
		border-radius: 10rpx;

		.border-bottom {
			padding-bottom: 30rpx;
			border-bottom: 1px solid rgba(0, 0, 0, 0.4);
		}

		.title {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
		}

		.msg-box {
			padding: 30rpx;
			border-top: 1px solid rgba(0, 0, 0, 0.4);

			.avatar {
				width: 86rpx;
				height: 86rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				font-size: 24rpx;
				font-weight: 500;
				color: #333333;
			}

			.share-qrcode {
				width: 100rpx;
				height: 100rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					// border-radius: 5000px;
				}
			}
		}


		.time {
			padding-bottom: 30rpx;
			// text-align: end;
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;
		}

		.card-img {
			width: 640rpx;
			height: 360rpx;
			border-radius: 20rpx;

			image {
				border-radius: 20rpx;
				width: 100%;
				height: 100%;
			}
		}
	}

	.bottom-session {
		width: 100%;
		height: 15vh;
		position: fixed;
		bottom: 0;
		background-color: white;
		border-radius: 20rpx 20rpx 0 0;
	}
</style>
