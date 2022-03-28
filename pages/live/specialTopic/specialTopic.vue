<template>
	<view class="bg-white">
		<!-- 标题栏 -->
		<cu-custom isBack bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">专题</text>
			</view>
		</cu-custom>
		<view class="">
			<image class="top-img" :src="channel_info.banner" mode="aspectFit"></image>
			<view class="top-describe">
				{{channel_info.describe}}
			</view>
			<!-- 直播间卡片 /pages/live/history/history-->
			<view class="cu-card case">
				<view v-for="video in videoList" :key="video.id" class="padding-bottom flex flex-wrap justify-center">
					<view class="margin-bottom" style="height: 1rpx;width: 100%;transform: scale(0.8);background-color: #ccc;"></view>
					<view class="cu-item bg-white border-bottom video-card"
						@click="toLiveRoom(video.id, video.type)">
						<view class="image">
							<view class="trademark">
								<image :src="video.author_image" class="bg-black mark margin-lr-xs round" mode="widthFix">
								</image>
							</view>
							<image :src="video.banner" mode="widthFix"></image>
							<view class="cu-tag round margin-top margin-right flex align-center"
								style="padding-right:0;padding-left: 0; background: rgba(0,0,0,0.3);">
								<view class="flex align-center justify-center text-white live-hot-total">
									<text style="padding-top: 4rpx">{{video?$mUtils.transformNum(video.viewers || video.virtual_viewers) : '--'}}</text>
								</view>
								<!-- 直播中 -->
								<view v-if="video.status == 1"
									class="bg-gradual-red flex align-center justify-center live-status">
									<text class="icon-living"></text> {{video.status_cn}}
								</view>
								<!-- 预告/未开始 -->
								<view v-if="video.status == -1"
									class="bg-gradual-blue flex align-center justify-center live-status">
									<text class="live-trailer"></text> {{video.status_cn}}
								</view>
								<!-- 回放/已结束 -->
								<view v-if="video.status == 0"
									class="bg-gradual-green flex align-center justify-center live-status">
									<text class="live-history"></text> {{video.status_cn || '回放'}}
								</view>
							</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{video.title}}</text></view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<!-- <view class="cu-avatar round lg" :style="'background-image'+':url(' + video.author_image + ');'"></view> -->
								<!-- <view class="cu-avatar round lg" :style="{backgroundImage:'url(' + video.author_image + ')'}"></view> -->
								<view class="cu-avatar round" :style="[{backgroundImage:'url(' + video.author_image + ')'}]">
								</view>
								<view class="content flex-sub flex">
									<view class="padding-right text-xl"><text class="text-cut text-lg">{{video.author_name || ''}}</text></view>
									<view class="text-grey">{{video.create_time || ''}}</view>
									<!-- <view class="text-gray text-sm flex justify-between">
										{{video.start_time_cn}}
										<view class="text-gray text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
											<text class="cuIcon-messagefill margin-lr-xs"></text> 30
										</view>
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getChannelInfo
	} from "@/apis/index.js"
	export default {
		data() {
			return {
				id: null,
				channel_info: null,
				live_list: [],
				page: 1
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.getlives();
		},
		onReachBottom() {
			this.page++;
			this.getlives()
		},
		methods: {
			getlives() {
				let params = {
					id: this.id,
					page: this.page,
					pagesize: 10
				}
				if(this.$store.getters.userInfo) {
					params['user_id'] = this.$store.getters.userInfo.id
				}
				getChannelInfo(params).then(res => {
					// console.debug(res)
					this.channel_info = res.data;
					this.live_list = [...this.live_list, ...res.data.topic];
				}).catch(err => {
					console.error(err)
				})
			},
			
			// 跳页判断
			toLiveRoom(live_id, live_type) {
				if(live_type == 2) {
					this.$mUtils.jumpPage('/pages/live/liveImageText/liveImageText', {id: live_id})
				} else {
					this.$mUtils.jumpPage('/pages/live/live', {id: live_id})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top-img {
		width: 100%;
		min-height: 300rpx;
	}
	.top-describe {
		padding: 0 30rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #666666;
	}
	.text-gray {
		color: #cccccc
	}

	page {
		background-color: white;
	}

	.image .trademark {
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		z-index: 10;
	}
	
	.video-card {
		width: 690rpx;
		// height: 462rpx;
		.cu-tag {
			height: 36rpx;
		}
		.image {
			height: 420rpx;
			width: 690rpx;
			border-radius: 10rpx;
			overflow: hidden;
			.cu-bar {
				height: 100rpx;
				overflow: hidden;
			}
			image {
				height: 420rpx !important;
				width: 690rpx;
			}
		}
		.cu-list.menu-avatar {
			height: 72rpx;
			.cu-item {
				height: 72rpx;
				.cu-avatar {
					width: 45rpx;
					height: 45rpx;
					left: 0;
				}
				
				.content {
					left: 58rpx;
					width: 630rpx;
				}
			}
		}
		.cu-list.menu-avatar>.cu-item .content>uni-view:first-child {
			font-size: 30rpx;
		}
		.cu-list.menu-avatar>.cu-item .flex .text-cut {
		    max-width: 325rpx;
		}
	}

	.cu-card.case .image .trademark .mark {
		width: 40rpx !important;
		height: 40rpx !important;
	}

	.soild-top {
		border-top: 1px solid #555555;
	}

	.tag {
		display: inline-block;
	}

	.live-hot-total {
		width: 100rpx;
		height: 36rpx;
	}

	.live-status {
		height: 36rpx;
		border-radius: 326rpx 160rpx 160rpx 0;
		width: 117rpx;
		font-size: 22rpx;
	}

	.icon-living {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background-image: url(/static/img/icon_live_fff.png);
		webkit-animation: matchLiving .6s steps(6) infinite;
		animation: matchLiving .6s steps(6) infinite;
	}

	@keyframes matchLiving {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -108px 0;
		}
	}

	.live-trailer {
		width: 24rpx;
		height: 24rpx;
		padding-right: 5rpx;
		background-image: url(/static/img/live_trailer.png);
		background-size: contain;
		background-repeat: no-repeat;
	}

	.live-history {
		width: 24rpx;
		height: 24rpx;
		padding-right: 5rpx;
		background-image: url(/static/img/live_history.png);
		background-size: contain;
		background-repeat: no-repeat;
	}

	.bg-shadeBottom {
		background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3));
		background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3));
		color: #ffffff;
	}

	.bottom-modal {
		.top-bar {
			height: 80rpx;

			.right-icon {
				height: 80rpx;
				width: 80rpx;
			}
		}

		.nav-tag {
			width: 187rpx;
			height: 60rpx;
			background: #F5F5F5;
		}

		.nav-tag.active {
			background: #0681EB;
			color: white;
		}
	}
</style>
