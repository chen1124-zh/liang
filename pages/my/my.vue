<template>
	<view class="my">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">个人中心</text>
			</view>
		</cu-custom>
		<!-- 顶部用户信息 -->
		<view class="user-msg-card flex align-center justify-center">
			<image class="card-bg" src="/static/img/user/card_bg.png" mode="aspectFit"></image>
			<view class="text-center card-content">
				<!-- <image class="cu-avatar round xl" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image> -->
				<view class="u-avatar round xl"
					style="width: 150rpx;height:150rpx;overflow: hidden;margin: 0 auto 20rpx;">
					<open-data type="userAvatarUrl" style="width: 150rpx;height:150rpx;overflow: hidden;"></open-data>
				</view>
				<!-- <view class="avatar-text text-lg text-white padding-top-xs">匿名用户</view> -->
				<open-data type="userNickName" class="avatar-text text-item-size text-white padding-top-sm"></open-data>
			</view>
		</view>
		<!-- 页面主体内容 -->
		<view class="content">
			<view class="cu-list menu sm-border m-shadow top-space">
				<view class="cu-item arrow" @click="showTip">
					<navigator class="content flex align-center" hover-class="none" url="../list/list"
						open-type="navigate">
						<image class="icon-size" src="/static/img/user/icon_my_focus.png" mode="aspectFit"></image>
						<text class="text-grey text-item-size">我关注的</text>
					</navigator>
				</view>
				<view class="cu-item arrow" @click="showTip">
					<navigator class="content flex align-center" hover-class="none" url="../list/list"
						open-type="navigate">
						<image class="icon-size" src="/static/img/user/icon_my_appointment.png" mode="aspectFit">
						</image>
						<text class="text-grey text-item-size">我预约的</text>
					</navigator>
				</view>
				<view class="cu-item arrow" @click="$mRouter.push({route:$mRoutesConfig.history})">
					<view class="content flex align-center" hover-class="none">
						<image class="icon-size" src="/static/img/user/icon_history.png" mode="aspectFit"></image>
						<text class="text-grey text-item-size">观看记录</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border top-space m-shadow">
				<view class="cu-item arrow" @click="$mUtils.jumpPage('/pages/my/about')">
					<view class="content flex align-center">
						<image class="icon-size" src="/static/img/user/icon_about.png" mode="aspectFit"></image>
						<text class="text-grey text-item-size">关于我们</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="$mUtils.jumpPage('/pages/my/contact')">
					<view class="content flex align-center">
						<image class="icon-size" src="/static/img/user/icon_advise.png" mode="aspectFit"></image>
						<text class="text-grey text-item-size">意见反馈</text>
					</view>
				</view>
			</view>
			<view class="flex align-center round bg-white margin-top-xs padding m-msg-box">
				<view class="flex align-center border-right padding-right-sm">
					<view class="round wechat-icon margin-right-sm">
						<image class="width-fill height-fill" src="../../static/img/user/icon_wechat.png"
							mode="aspectFit"></image>
					</view>
					<view class="text-df">
						<view class="font1">更多精彩直播尽在泥燕直播公众号</view>
						<!-- <view class="font1">泥燕直播公众号</view> -->
					</view>
				</view>
				<view class="btn-box">
					<button class="cu-btn bg-blue round" @click="showWechatQrCode" data-modal='public_modal'>
						<view class="padding-lr-sm text-lg" style="white-space: nowrap;">
							去关注
						</view>
					</button>
				</view>
			</view>
		</view>

		<!-- 土司弹窗 -->
		<view class="cu-modal showtip" :class="modalName=='showtip'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl text-white">
					暂未开通~
				</view>
			</view>
		</view>
		<!-- 公众号弹窗 -->
		<view class="cu-modal" :class="modalName=='public_modal'?'show':''" @click="hideModal">
			<view class="cu-dialog m-dialog" @click.stop>
				<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal">
						<image class="close_btn" src="/static/img/user/close_btn.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="padding-lr-sm padding-bottom-xl bg-white">
					<image class="niyan-qrcode" :src="qr_code" show-menu-by-longpress mode="aspectFit"></image>
					<view class="text-lg">
						长按可保存二维码或扫码关注公众号
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import videoList from '@/components/my/list.vue';
	import indexBackgroundImage from "@/static/img/user/card_bg.png"
	import {
		getWechatQrCode
	} from "@/apis/index.js"
	export default {
		components: {
			videoList
		},
		data() {
			return {
				indexBackgroundImage: indexBackgroundImage,
				TabCur: 0,
				scrollLeft: 0,
				tabList: [{
						name: '作品',
						number: 114
					},
					{
						name: '喜欢',
						number: 99
					},
				],
				qr_code: null,
				videoList: [],
				modalName: null
			};
		},
		onLoad() {},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.getVideoList();
			},
			getVideoList() {
				// uni.request({
				// 	url: 'http://api.52170.xin/video?page_size=20',
				// 	dataType: 'json',
				// 	success: res => {
				// 		console.log(res);
				// 		for (let item of res.data.data.list) {
				// 			this.videoList.push({
				// 				video_id: item.video_id,
				// 				nickname: item.nickname,
				// 				video_describe: item.video_describe,
				// 				cover_url: item.cover_url,
				// 				video_url: item.video_url,
				// 				dianzan: item.dianzan,
				// 				pinglun: item.pinglun,
				// 				zhuanfa: item.zhuanfa,
				// 				flag: false,
				// 				check: false
				// 			});
				// 		}
				// 	}
				// });
			},
			showTip() {
				this.modalName = 'showtip';
				setTimeout(() => {
					this.modalName = null
				}, 1500)
			},
			showWechatQrCode(e) {
				getWechatQrCode().then(res => {
					this.qr_code = res.data.imageurl;
					this.showModal(e)
				})
			},
			showModal(e) {
				console.debug(e)
				this.modalName = e.currentTarget.dataset.modal;
			},
			hideModal() {
				this.modalName = null;
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: white;
	}

	.my {
		background-color: white;
		// height: 100vh;
		width: 100vw;
		// padding-bottom: 100rpx;
	}

	.banner {
		background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg);
		width: 100vw;
		min-height: 200upx;
		background-size: cover;
	}
	
	.text-item-size {
		font-size: 40rpx;
	}

	// 改变列表高度
	.cu-list.menu>.cu-item {
		min-height: 9vh;
	}

	.user-info {
		.header {
			text-align: center;
			padding: 10upx 0;

			image {
				width: 150upx;
				height: 150upx;
			}
		}

		.right {
			.btn {
				background-color: rgba(57, 58, 68, 0.5);
				color: #FFFFFF;
				padding: 15upx 30upx;
				margin: 0 8upx;
				border: 1px solid rgba(217, 210, 194, 0.3);
			}
		}
	}

	.user-detail {
		border-bottom: 1px solid rgba(217, 210, 194, 0.2);
		padding: 10upx 0;

		.left {
			flex-direction: column;
			text-align: left;
			padding-left: 80upx;

			// margin-left: 30upx;
			.number {
				margin: 10upx 0;
			}
		}
	}

	.qianming {
		padding: 20upx;
		padding-left: 80upx;
	}

	.adv {
		padding: 20upx;
	}



	// 页面主体内容
	.content {
		padding-left: 30rpx;
		padding-right: 30rpx;

		.m-shadow {
			box-shadow: 0px 12px 9px 0px rgba(60, 154, 248, 0.08);
		}

		.m-msg-box {
			padding-left: 30rpx;
			box-shadow: 0px 12px 24px 0px rgba(60, 154, 248, 0.08);
			border-radius: 66px;

			.padding-right-sm {
				padding-right: 26rpx;
			}

			.btn-box {
				padding-left: 40rpx;

				button {
					background-color: #3492F6;
				}
			}
		}

		.top-space {
			// margin-top: 7rpx;
			margin-top: 1rpx;
		}
	}

	.user-msg-card {
		// border-radius: 0 0 100rpx 100rpx;
		// margin: 20rpx auto 0;
		width: 100%;
		height: 350rpx;
		background-position-x: center;
		// background: url('~@/static/img/user/card_bg.png');
		position: relative;

		.card-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 356rpx;
			z-index: 1;
		}

		.card-content {
			z-index: 10;
		}
	}

	.cu-list.menu>.cu-item .content>image.icon-size {
		width: 30rpx;
		height: 30rpx;
		padding-right: 5rpx;
	}

	.border-right {
		border-right: 1rpx solid #ededed
	}

	.wechat-icon {
		width: 80rpx;
		height: 80rpx;
		// background-color: #ccc;
		image {
			width: 80rpx;
			height: 80rpx;
		}
	}
	.font1 {
		font-size: 32rpx;
	}

	// 土司弹窗样式
	.showtip.cu-modal {
		background: none;

		.cu-dialog {
			background: rgba(0, 0, 0, 0.6);
			width: 300rpx;
		}
	}

	// 公众号弹窗样式
	.m-dialog {
		width: 555rpx;
		// height: 615rpx;

		.cu-bar {
			height: 80rpx;
			min-height: unset;
		}
	}

	.close_btn {
		width: 54rpx;
		height: 59rpx;
	}

	.niyan-qrcode {
		width: 420rpx;
		height: 420rpx;
	}
</style>
