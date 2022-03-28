<template>
	<view class="page">
		<!-- 标题栏 -->
		<cu-custom isBack bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">直播间</text>
			</view>
		</cu-custom>
		<view class="content flex flex-direction" :style="{height: `calc(100vh - ${CustomBar}px)`}">
			<view class="p-relative">
				<view v-if="live.status == -1" class="video-mask"></view>
				<!-- <image class="top-area" src="http://ny.judexinxi.cn/uploads/attachment/20210513/84b02c176cae8fb7d671db52cb1ccab3.jpg" mode="aspectFill"></image> -->
				<view v-if="live" class="top-area">
					<liveplayer live-style="height: 420rpx" :video-url="live.wz_info.play_url" :room-id="live.topic_id"
						object-fit="contain" :poster="live.poster || live.cover">
					</liveplayer>
				</view>
				<view class="icon">
					<image class="round" :src="live.author_image" mode="aspectFill"></image>
				</view>
				<!-- 直播中 -->
				<view v-if="live.status == 1"
					class="status-tag bg-gradual-red round text-center padding-sm margin-right flex align-center liveing">
					<text class="icon-living"></text> 正在直播
				</view>
				<!-- 预告 -->
				<view v-if="live.status == -1"
					class="status-tag bg-gradual-blue round text-center padding-sm margin-right flex align-center justify-center">
					<text class="live-trailer"></text> 预告
				</view>
				<!-- 回放 -->
				<view v-if="live.status == 0"
					class="status-tag bg-gradual-green round text-center padding-sm margin-right flex align-center justify-center">
					<text class="live-history"></text> 回放
				</view>
				<view v-if="live.status == -1" class="time-box">
					<view class="time-top text-center padding-bottom-sm">
						<image class="icon1 left" src="../../../static/img/icon1.png" mode="aspectFit"></image>距离直播时间还有
						<image class="icon1" src="../../../static/img/icon1.png" mode="aspectFit"></image>
					</view>
					<view class="time-content flex">
						<!-- <view class="time-num space flex align-center justify-center">
							{{count_down.leftd > 9?count_down.leftd: '0' + count_down.leftd}}</view>
						<view class="time-num space flex align-center justify-center">
							{{count_down.lefth > 9?count_down.lefth: '0' + count_down.lefth}}</view>
						<view class="time-num space flex align-center justify-center">
							{{count_down.leftm > 9?count_down.leftm: '0' + count_down.leftm}}</view>
						<view class="time-num flex align-center justify-center">
							{{count_down.lefts > 9?count_down.lefts: '0' + count_down.lefts}}</view> -->
							<view class="flex align-center justify-center">
								<view class="time-num1">
									{{calcNum1(count_down.leftd)}}
								</view>
								<view class="time-num2">
									{{calcNum2(count_down.leftd)}}
								</view>
								<view class="colon">:</view>
							</view>
							<view class="flex align-center justify-center">
								<view class="time-num1">
									{{calcNum1(count_down.lefth)}}
								</view>
								<view class="time-num2">
									{{calcNum2(count_down.lefth)}}
								</view>
								<view class="colon">:</view>
							</view>
							<view class="flex align-center justify-center">
								<view class="time-num1">
									{{calcNum1(count_down.leftm)}}
								</view>
								<view class="time-num2">
									{{calcNum2(count_down.leftm)}}
								</view>
								<view class="colon">:</view>
							</view>
							<view class="flex align-center justify-center">
								<view class="time-num1">
									{{calcNum1(count_down.lefts)}}
								</view>
								<view class="time-num2">
									{{calcNum2(count_down.lefts)}}
								</view>
							</view>
					</view>
					<view class="time-bottom flex">
						<view class="bottom-text space flex justify-center">天</view>
						<view class="bottom-text space flex justify-center">时</view>
						<view class="bottom-text space flex justify-center">分</view>
						<view class="bottom-text flex justify-center">秒</view>
					</view>
				</view>

				<view class="title flex justify-between padding" style="height: 100rpx;">
					<view class="flex align-center">
						<view class="left-icon">
							<image class="round" :src="live.author_image" mode="aspectFill"></image>
						</view>
						<view class="padding-left-sm text-lg">{{live.author_name || '--'}}</view>
					</view>
					<view class="flex align-center text-lg">
						<image class="eyes-icon" src="../../../static/img/eyes_b.png" mode="aspectFit">
							{{live?$mUtils.transformNum(live.viewers) : '--'}}人观看
					</view>
				</view>
			</view>
			<!-- 中间内容 -->
			<view class="flex-sub flex flex-direction padding-lr">
				<view class="bg-white nav border-bottom" style="height: 100rpx;">
					<view class="flex text-center">
						<view class="cu-item flex-sub text-xl" :class="index==TabCur?'current':''"
							v-for="(item,index) in [{content:'直播介绍'},{content:'评论'}]" :key="index" @tap="tabSelect"
							:data-id="index">
							{{item.content}}
						</view>
					</view>
				</view>
				<view class="flex-sub p-relative">
					<!-- <scroll-view v-if="TabCur == 0" scroll-y class="live-introduce flex-sub"
						:style="{height: `calc(100vh - ${CustomBar}px - )`}"> -->
					<scroll-view v-if="TabCur == 0" scroll-y class="live-introduce"
						:style="{height: `calc(100vh - ${CustomBar}px - 620rpx)`}">
						<view class="title flex justify-between padding">
							<view class="flex align-center">
								<view class="left-icon">
									<image class="round" :src="live.author_image" mode="aspectFill"></image>
								</view>
								<view class="padding-left-sm text-lg">{{live.author_name || '--'}}</view>
							</view>
							<view class="flex align-center text-lg">
								{{live.start_time_cn || '--'}}
							</view>
						</view>
						<rich-text :nodes="live.graphic_details"></rich-text>
					</scroll-view>
					<!-- <view v-if="TabCur == 1" class="total-comment-text">共15条评论</view> -->
					<!-- 	<scroll-view v-if="TabCur == 1" scroll-y :scroll-into-view="scroll_comment_id" class="live-comment flex-sub" :style="{height: `calc(100vh - ${CustomBar}px - 590rpx)`}">
						<view class="comment-tip">欢迎来到直播间，直播间内禁止出现违法违规低俗色情，吸烟酗酒等内容请大家共同遵守、监督。</view>
						<view v-for="item in comments" :key="item.id" :id="'view-' + item.id" class="comment padding-tb-sm"><text class="sender">{{item.sender}}：</text>{{item.comment}}</view>
					</scroll-view> -->
				</view>
			</view>
		</view>
		<view v-if="TabCur == 1" class="cover-view-left" :style="{height: `calc(100vh - ${CustomBar}px - 620rpx)`}">
			<vzan-im :live-tpid="live.topic_id" :live-zbid="live.id" live-key="b086af0850704f3ab41a9a43b290c740"
				:live-cover="true" live-theme="light" :user-key="userInfo.id" :nick-name="userInfo.nickname"
				:user-avatar="userInfo.avatar"></vzan-im>
			<view class="btn-box flex justify-around">
				<view class="bottom-icon margin-right-sm" @click="toInvitation">
					<image src="../../../static/img/invitation.png" mode="aspectFit"></image>
				</view>
				<view class="bottom-icon margin-right-sm p-relative" @click.stop="tapLove">
					<zan-animate :zan_click="zan_click"></zan-animate>
					<view class="cu-tag badge bg-blue zan-badge">{{$mUtils.transformNum(zan_num)}}</view>
					<image src="../../../static/img/zan.png" mode="aspectFit"></image>
				</view>
				<view class="bottom-icon p-relative">
					<image src="../../../static/img/share.png" mode="aspectFit"></image>
					<button class="btn" open-type='share'></button>
				</view>
			</view>
		</view>
		<view v-if="TabCur == 0" class="footer padding-lr">
			<view class="flex align-center height-fill">
				<view class="input-box padding-lr flex flex-sub align-center">
					<view class="comment-input flex align-center" @tap="tabSelect" data-id="1">
						<input disabled type="text" class="flex-sub" placeholder="发表评论" v-model="comment_text" />
						<button disabled class="send-btn" type="default" @click.stop="addComment">
							<view class="send-btn-text">发送</view>
						</button>
					</view>
				</view>
				<view class="flex padding-left justify-around">
					<view class="bottom-icon margin-right-sm" @click.stop="toInvitation">
						<image src="../../../static/img/invitation.png" mode="aspectFit"></image>
					</view>
					<view class="bottom-icon margin-right-sm p-relative" @click.stop="tapLove">
						<zan-animate :zan_click="zan_click"></zan-animate>
						<cover-view class="cu-tag badge bg-blue zan-badge">{{$mUtils.transformNum(zan_num)}}
						</cover-view>
						<image src="../../../static/img/zan.png" mode="aspectFit"></image>
					</view>
					<view class="bottom-icon p-relative">
						<image src="../../../static/img/share.png" mode="aspectFit"></image>
						<button class="btn" open-type='share'></button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	import indexHeader from '@/components/index-header.vue';
	import cuVideo from '@/components/cu-video.vue';
	import {
		getTopicDetail,
		giveLike,
		getThumb

	} from "@/apis/index.js"
	export default {
		computed: {
			...mapGetters(['userInfo']),
			calcNum1() {
				return function(num) {
					if(num>9){
						let n = num.toString()
						return n.slice(0, 1);
					} else {
						return '0';
					}
				}
			},
			calcNum2() {
				return function(num) {
					if(num>9){
						let n = num.toString()
						return n.slice(1);
					} else {
						return num || '0'
					}
				}
			}
		},
		data() {
			return {
				TabCur: 0,
				CustomBar: this.CustomBar,
				type: 2,
				live: null,
				comments: [],
				count_down: {
					leftd: 0,
					lefth: 0,
					leftm: 0,
					lefts: 0
				},
				comment_text: '',
				scroll_comment_id: null,
				zan_click: 0,
				page_path: '',
				zan_num: 0, // 点赞数
				is_init: false
			}
		},
		page_path: null,
		zan_interval: null, // 更新点赞数据定时器
		count_down_interval: null, // 倒计时定时器
		onLoad(e) {
			this.init(e)
			let pages = getCurrentPages();
			this.page_path = (pages[pages.length - 1]).route;
		},
		onShow() {
			if (!this.live) {
				let params = this.$store.getters.page_params;
				this.init(params);
				let pages = getCurrentPages();
				this.page_path = (pages[pages.length - 1]).route;
			}
			console.log('界面显示')
			this.zanCommit()
		},
		onHide() {
			if (this.zan_interval) {
				clearInterval(this.zan_interval);
				this.zan_interval = null;
			}
			this.is_init = false
		},
		onUnload() {
			if (this.zan_interval) {
				clearInterval(this.zan_interval);
				this.zan_interval = null;
			}
		},
		methods: {
			async init(e) {
				if (this.is_init) {
					return
				} else {
					this.is_init = true
				}
				let res = await this.getVideo(e.id);
				if (res.code == 1) {
					this.live = res.data;
					// console.debug('init',res)
					this.count_down_interval = setInterval(() => {
						this.howtime(res.data.start_time)
					}, 1000)
					this.getZanNum();
					this.zanCommit(); // 开启定时器
				} else if (res.code == 0 && res.err.err.code == 201) {
					if (e.id) {
						this.$store.commit("SET_PAGE_PARAMS", e)
					}
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			async getVideo(id) {
				return new Promise((resolve, reject) => {
					getTopicDetail({
						id: id
					}).then(res => {
						// console.debug('getVideo',res)
						resolve({
							code: 1,
							data: res.data
						});
					}).catch(err => {
						console.debug(err)
						resolve({
							code: 0,
							err: err
						})
					})
				})
			},
			// 倒计时
			// howtime(start_time) {
			// 	let nowtime = new Date() //获取当前时间
			// 	let endtime = new Date(start_time * 1000); //定义结束时间
			// 	let lefttime = endtime.getTime() - nowtime.getTime() //距离结束时间的毫秒数		
			// 	this.count_down.leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)) //计算天数		
			// 	this.count_down.lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24) //计算小时数		
			// 	this.count_down.leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数		
			// 		this.count_down.lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
			// 	// return leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
			// 	console.debug(this.count_down.leftd,this.count_down.lefth,this.count_down.leftm,this.count_down.lefts)
			// },
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 倒计时
			async howtime(start_time) {
				let nowtime = new Date() //获取当前时间
				let endtime = new Date(start_time * 1000); //定义结束时间
				let lefttime = endtime.getTime() - nowtime.getTime() //距离结束时间的毫秒数	
				if (lefttime <= 0) {
					let res = await this.getVideo(this.live.id)
					if (res.code == 1) {
						this.live = res.data;
					}
					this.getZanNum();
					this.zanCommit(); // 开启数据定时器
					clearInterval(this.count_down_interval);
					this.count_down_interval = null;
					return;
				}
				this.count_down.leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)) //计算天数		
				this.count_down.lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24) //计算小时数		
				this.count_down.leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数		
					this.count_down.lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
				// return leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
				// console.debug(this.count_down.leftd,this.count_down.lefth,this.count_down.leftm,this.count_down.lefts)
			},
			//  发表评论
			addComment() {
				console.debug('addComment')
				this.TabCur = 1;
				if (!this.comment_text.trim()) {
					return;
				}
				this.comments.push({
					id: this.comments.length,
					sender: '我',
					comment: this.comment_text.trim()
				});
				this.scroll_comment_id = 'view-' + (this.comments.length - 1);
				this.comment_text = '';
			},

			// 邀请
			toInvitation() {
				this.$mUtils.jumpPage('/pages/share/share', {
					share_image: this.live.share_image,
					author_image: this.live.author_image,
					qrcode_image: this.live.qrcode_image,
					author_name: this.live.author_name,
					title: this.live.title,
					start_time_cn: this.live.start_time_cn,
					id: this.live.id
				})
			},

			// 获取点赞数
			getZanNum() {
				getThumb({
					tid: this.live.id
				}).then(res => {
					this.zan_num = res.data.likenum;
				})
			},
			// 点赞
			tapLove(e) {
				this.live.is_dianzan = true;
				this.zan_click++;
				this.zan_num++;
			},
			// 分享
			onShareAppMessage(options) {
				console.log('onShareAppMessage')
				var that = this;
				// 设置菜单中的转发按钮触发转发事件时的转发内容
				var shareObj = {
					title: this.live.title, // 默认是小程序的名称(可以写slogan等)
					path: '/' + this.page_path + '?id=' + this.live.id, // 默认是当前页面，必须是以‘/’开头的完整路径
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
					shareObj.path = '/' + this.page_path + '?id=' + this.live.id;
				}
				// 返回shareObj
				return shareObj;
			},

			// 间隔上传点赞数据
			zanCommit() {
				this.zan_interval = setInterval(() => {
					if (this.zan_click == 0) {
						return;
					}
					giveLike({
						uid: this.userInfo.id,
						tid: this.live.id,
						likenum: this.zan_click,
						topic_type: this.live.type
					}).then(res => {
						this.getZanNum()
						this.zan_click = 0;
					})
				}, 15000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-tag.badge {
		right: -25rpx;
	}

	.page {
		background-color: white;
	}

	.eyes-icon {
		width: 32rpx;
		height: 20rpx;
	}

	// 顶部区域布局
	.top-area {
		width: 100%;
		height: 420rpx;
		background-color: #333333;
	}
	
	// 隐藏vz插件自带倒计时
	/deep/ .video-component--live-reminder-window {
		display: none !important;
	}
	/deep/ .component-index--live-reminder-window, /deep/ .video-component-index--live-reminder-window {
		display: none !important;
	}

	.icon {
		position: absolute;
		left: 30rpx;
		top: 20rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 10;

		image {
			width: 45rpx;
			height: 45rpx;
		}
	}

	.status-tag {
		width: 173rpx;
		height: 58rpx;
		font-size: 24rpx;
		position: absolute;
		right: 42rpx;
		top: 20rpx;
		z-index: 10;
	}

	.icon-living {
		margin-right: 5rpx;
		display: inline-block;
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
	
	// 视频蒙层
	.video-mask {
		width:100%;
		height: 420rpx;
		position: absolute;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.live-trailer {
		margin-right: 5rpx;
		width: 24rpx;
		height: 24rpx;
		padding-right: 5rpx;
		background-image: url(/static/img/live_trailer.png);
		background-size: contain;
		background-repeat: no-repeat;
	}

	.live-history {
		margin-right: 5rpx;
		width: 24rpx;
		height: 24rpx;
		padding-right: 5rpx;
		background-image: url(/static/img/live_history.png);
		background-size: contain;
		background-repeat: no-repeat;
	}

	.left-icon {
		width: 66rpx;
		height: 66rpx;

		image {
			width: 66rpx;
			height: 66rpx;
		}
	}

	// 倒计时时间样式
	.icon1 {
		width: 28rpx;
		height: 16rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.icon1.left {
		transform: rotate(180deg);
	}

	.time-box {
		position: absolute;
		top: 107rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;

		.time-top {
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
		}

		.time-content {
			// width: 470rpx;
			height: 85rpx;
			// background: url(/static/img/time_bg.png);
			background-size: contain;
			background-repeat: no-repeat;
			font-size: 60rpx;
			font-weight: bold;
			color: #FFFFFF;

			// .time-num {
			// 	width: 108rpx;
			// 	height: 85rpx;
			// 	background-color: rgba(85, 170, 255, 0.8);
			// }
			
			.time-num1 {
				background-color: rgba(0, 129, 255, 0.8);
				margin-right:8rpx;
				border-radius: 5rpx;
				padding:5rpx 5rpx;
			}
			.time-num2 {
				background-color: rgba(0, 129, 255, 0.8);
				border-radius: 5rpx;
				padding:5rpx 5rpx;
			}
			.colon {
				color: white;
				font-size: 40rpx;
				padding-left: 5rpx;
				padding-right: 5rpx;
			}

			.time-num.space {
				margin-right: 19rpx;
			}
		}

		.time-bottom {
			// width: 470rpx;

			.bottom-text {
				width: 108rpx;
				height: 85rpx;
				font-size: 30rpx;
				font-weight: bold;
				color: #FFFFFF;
			}

			.bottom-text.space {
				// margin-right: 19rpx;
			}
		}
	}


	// tab主要内容
	.border-bottom {
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.4);
	}

	.live-comment {
		padding-top: 100rpx;
	}

	.live-introduce,
	.live-comment {
		width: 100%;
		padding-bottom: 100rpx;
	}

	.current {
		color: #333333;
		position: relative;

		&:after {
			content: '';
			width: 36rpx;
			height: 0;
			border-bottom: 6rpx solid #0681eb;
			border-radius: 3px;
			position: absolute;
			left: 50%;
			bottom: 10rpx;
			transform: translateX(-50%);
			transition: .3s;
		}
	}
	// 播放插件背景问题修复
	/deep/.video-component--live-reminder-info .video-component--live-reminder-poster, .video-im-component--live-reminder-info .video-im-component--live-reminder-poster {
	    z-index: 0;
	}
	/deep/ .component-index--live-reminder-info .component-index--live-reminder-poster, /deep/ .video-component-index--live-reminder-info .video-component-index--live-reminder-poster {
		z-index: 0;
	}
	

	// 评论区样式
	/deep/ .component--live_bottom.component--focus,
	/deep/ .im-component--live_bottom.im-component--focus {
		height: auto;
		background: rgba(0, 0, 0, 0);
	}

	/deep/ .component--live_bottom.component--focus,
	/deep/ .im-component--live_bottom.im-component--focus {
		width: 420rpx;
	}

	/deep/ .component--chat-wrapper .component--top-tips,
	/deep/ .im-component--chat-wrapper .im-component--top-tips {
		color: #FFCA09;
	}

	/deep/ .component--light .component--chat-wrapper {
		background-color: #fff;
	}
	/deep/ .im-component--light .im-component--chat-wrapper {
		background-color: #fff;
	}
	
	// 新版本兼容 im-component-index--live_bottom im-component-index--focus
	/deep/ .index--live_bottom.index--focus,
	/deep/ .im-component-index--live_bottom.im-component-index--focus {
		height: auto;
		background: rgba(0, 0, 0, 0);
	}
	
	/deep/ .index--live_bottom.index--focus,
	/deep/ .im-component-index--live_bottom.im-component-index--focus {
		width: 420rpx;
	}
	
	/deep/ .index--chat-wrapper .index--top-tips,
	/deep/ .im-component-index--chat-wrapper .im-component-index--top-tips {
		color: #FFCA09;
	}
	
	/deep/ .index--light .index--chat-wrapper {
		background-color: #fff;
	}
	/deep/ .im-component-index--light .im-component-index--chat-wrapper {
		background-color: #fff;
	}

	.btn {
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0);
		z-index: 100;
	}

	.btn-box {
		width: 300rpx;
		position: absolute;
		bottom: 8rpx;
		right: 20rpx;

		.bottom-icon {
			width: 80rpx;
			height: 80rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.zan-badge {
			z-index: 100;
			border: 2rpx solid white;
		    right: -15rpx;
		}
	}

	.cover-view-left {
		position: absolute;
		padding: 0 20rpx;
		width: 100%;
		height: 36vh;
		bottom: 0;
		z-index: 9999;
		font-size: 28rpx;
		color: #ffffff;
	}

	.left-text {
		font-size: 28rpx;
		color: #ffffff;
	}

	.total-comment-text {
		position: absolute;
		top: 0;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: #666666;
	}

	.comment-tip {
		font-size: 26rpx;
		font-weight: bold;
		color: #FFCA09;
	}

	.sender {
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
	}

	.comment {
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
	}

	// 底部
	.footer {
		width: 100%;
		height: 100rpx;
		background-color: white;
		position: fixed;
		bottom: 0;

		.input-box {
			width: 362rpx;
			height: 65rpx;
			border-radius: 5000rpx;
			background-color: #F4F4F4;
			border: 1px solid #D2D2D2;
		}

		/* 评论区 样式 */
		.comment-input {
			height: 60rpx;
			line-height: 60rpx;
			width: 100%;

			// display: inline-block;
			input {
				line-height: 60rpx;
				padding-right: 20rpx;
				border-right: 1rpx solid rgba(161, 161, 161, 0.37);
			}
		}

		.send-btn {
			// width: 50rpx;
			// height: 40rpx;
			padding: 0 0 0 15rpx;
			border-radius: unset !important;
			background: rgba(113, 113, 113, 0) !important;

		}

		.send-btn-text {
			// height: 60rpx;
			// line-height: 60rpx;
			font-size: 26rpx;
			color: #666666;
		}

		.bottom-icon {
			width: 80rpx;
			height: 80rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.zan-badge {
			z-index: 100;
			border: 2rpx solid white;
			right: -15rpx;
		}
	}
</style>
