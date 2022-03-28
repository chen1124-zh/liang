<template>
	<view class="index">
		<!-- 标题栏 -->
		<cu-custom isBack bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">直播间</text>
			</view>
		</cu-custom>
		<!-- 视频组件 -->
		<!-- <cu-video class="video" :video_list="videoList" @addComment="addComment"/> -->
		<view class="content" :style="{height: `calc(100vh - ${CustomBar}px)`}">
			<view>
				<view v-if="live" class="video-area" :style="{height: `calc(100vh - ${CustomBar}px)`}">
					<!-- https://vd4.bdstatic.com/mda-ki3q03d3xbqyuk5z/v1-cae/1080p/mda-ki3q03d3xbqyuk5z.mp4?v_from_s=gz_haokan_4469&auth_key=1621853653-0-0-5fba569046f288bafc7b2a9b0994a74f&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest= -->
					<liveplayer :live-style="{height: `calc(100vh - ${CustomBar}px)`}"
						:video-url="live.wz_info.play_url"
						:room-id="live.topic_id"
						object-fit="contain"
						:poster="live.banner">
					</liveplayer>
				</view>
				<!-- <cover-image class="play" v-if="show_play" @tap="videoPlay" src="/static/video/play_1.png">
				</cover-image> -->

				<!-- 视频顶部控件 -->
				<view class="topbar">
					<view class="p-relative content">
						<view class="avatar round margin-left-lg height-fill anchor-msg flex align-center">
							<image :src="live.author_image?live.author_image:''" class="avater img" @click.stop="tapAvater">
							</image>
							<view class="view-left-text">
								<view class="live-title">{{ live.author_name || '' }}</view>
								<view class="live-viewer-msg"><image class="eyes-icon" src="../../static/img/eyes.png" mode="aspectFit"></image>{{live?$mUtils.transformNum(live.viewers) : '--'}}人观看</view>
							</view>
						</view>
						<!-- <view
							class="status-tag bg-gradual-red round text-center padding-sm margin-right flex align-center">
							<view class="icon-living"></view>正在直播
						</view> -->
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
					</view>
				</view>
				<!-- 计时器 -->
				<!-- <view v-if="live.status == -1" class="time-box"> -->
				<view v-if="live.status == -1" class="time-box">
					<view class="time-top text-center padding-bottom-sm"><image class="icon1 left" src="../../static/img/icon1.png" mode="aspectFit"></image>距离直播时间还有<image class="icon1" src="../../static/img/icon1.png" mode="aspectFit"></image></view>
					<view class="time-content flex">
				<!-- 		<view class="time-num space flex align-center justify-center">{{count_down.leftd > 9?count_down.leftd: '0' + count_down.leftd}}</view>
						<view class="time-num space flex align-center justify-center">{{count_down.lefth > 9?count_down.lefth: '0' + count_down.lefth}}</view>
						<view class="time-num space flex align-center justify-center">{{count_down.leftm > 9?count_down.leftm: '0' + count_down.leftm}}</view>
						<view class="time-num flex align-center justify-center">{{count_down.lefts > 9?count_down.lefts: '0' + count_down.lefts}}</view> -->
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

				<!-- 评论区 -->
				<view class="cover-view-left">
					<!-- <view class="view-left-text">@{{ live.nickname }}</view> -->
					<!-- <scroll-view scroll-y :scroll-into-view="scroll_comment_id" class="view-left-text-content">
						<view class="tip-msg text-content-text padding">
							欢迎来到直播间，直播间内禁止出现违法违规、低俗色情，吸烟酗酒等内容请大家共同遵守、监督。
						</view>
						<view :id="'view-' + index" v-for="(text,index) in live.video_describes" :key="index" class="text-content-text">
							<text class="comment_sender">{{text.sender}}: </text>{{ text.content }}
						</view>
					</scroll-view>
					<view class="flex align-center padding-top">
						<view class="comment-input flex align-center">
							<input type="text" class="flex-sub" placeholder="说点什么吧" v-model="cur_comment" />
							<button class="send-btn" type="default" @click.stop="addComment">
								<view class="send-btn-text">发送</view>
							</button>
						</view>
						
					</view> -->
					
					<vzan-im 
					:live-tpid="live.topic_id" 
					:live-zbid="live.id" 
					live-key="b086af0850704f3ab41a9a43b290c740" 
					:live-cover="true" 
					live-theme="dark"
					:user-key="userInfo.id" 
					:nick-name="userInfo.nickname" 
					:user-avatar="userInfo.avatar"></vzan-im>
				</view>

				<!-- 右侧信息栏 -->
				<view class="cover-view-right">
					<cover-image src="/static/img/invitation.png" class="img-left margin-bottom-xl"
						@click.stop="toInvitation"></cover-image>
					<!-- <cover-view class="right-text">{{ live.pinglun }}</cover-view> -->

					<view class="p-relative margin-bottom-xl">
					<zan-animate :zan_click="zan_click"></zan-animate>
						<cover-view class="cu-tag badge bg-blue zan-badge">{{ $mUtils.transformNum(zan_num) }}</cover-view>
						<cover-image style="position:relative;"
							:src="live.is_dianzan ? '/static/img/zan.png' : '/static/img/zan.png'" class="img-left"
							@click.stop="tapLove"></cover-image>
						<!-- <cover-view class="right-text">{{ live.dianzan }}</cover-view> -->
					</view>
					<cover-view class="p-relative">
						<cover-image src="/static/img/share.png" class="img-left"></cover-image>
							<button open-type='share' style="position: absolute;width: 70rpx;height: 70rpx;top:0;left:0;background: rgba(0,0,0,0);z-index:100;color:rgba(0,0,0,0);">分享</button>
					</cover-view>
					<!-- <cover-view class="right-text">{{ live.zhuanfa }}</cover-view> -->

					<!-- <cover-image src="/static/video/changpian.png" class="musicIcon img">
					</cover-image> -->

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
		components: {
			indexHeader,
			cuVideo
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				title: 'Hello',
				live: null,
				cur_comment: '',
				scroll_comment_id: null,
				zan_click: 0,
				type: 2,	// 视频类型： 1直播/2预告/3回放
				count_down: {
					leftd:0,
					lefth:0,
					leftm:0,
					lefts:0
				},
				zan_num: 0	//点赞数
			}
		},
		page_path: null,
		zan_interval: null,		// 更新点赞数据定时器
		count_down_interval: null,	// 倒计时定时器
		is_init: false,
		
		onLoad(e) {
			this.init(e);
			let pages = getCurrentPages();
			this.page_path = (pages[pages.length-1]).route;
			// console.debug(this.page_path)
			// this.getVideo(e.id);
			// setInterval(() => {
			// 	this.howtime()
			// }, 1000)
		},
		onShow() {
			if(!this.live) {
				let params = this.$store.getters.page_params;
				this.init(params);
				let pages = getCurrentPages();
				this.page_path = (pages[pages.length-1]).route;
			}
			console.log('界面显示')
			this.zanCommit()
		},
		onHide() {
			if(this.zan_interval) {
				clearInterval(this.zan_interval);
				this.zan_interval = null;
			}
			this.is_init = false
		},
		onUnload() {
			if(this.zan_interval) {
				clearInterval(this.zan_interval);
				this.zan_interval = null;
			}
		},
		methods: {
			async init(e) {
				if(this.is_init){
					return
				} else {
					this.is_init = true
				}
				let res = await this.getVideo(e.id);
				// console.debug(res)
				if(res.code == 1) {
					this.live = res.data;
					// console.debug('init',res)
					this.count_down_interval = setInterval(() => {
						this.howtime(res.data.start_time) 
					}, 1000)
					this.getZanNum();
					this.zanCommit();	// 开启数据定时器
				} else if(res.code==0 && res.err.err.code == 201 ) {
					if(e.id){
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
						resolve({code: 1, data: res.data});
					}).catch(err => {
						console.debug(err)
						resolve({code: 0,err: err})
					})
				}) 
			},

			// 加评论
			addComment() {
				let content = this.cur_comment.trim();
				console.debug(this.live.video_describes)
				if (!content) {return;}
				this.live.video_describes.push({sender: '我', content: content});
				this.scroll_comment_id = 'view-' + (this.live.video_describes.length - 1);
				this.cur_comment = '';
			},
			
			// 查评论
			updateComment() {
				// todo 轮询数据
				getNewComment().then(res => {
					if(res.code === 10000) {
						// res.data.comments.foreach(item => {
						// 	this.live.video_describes.push(item)
						// })
						this.updateComment()
					} else {
						this.updateComment()
					}
				})
			},
			
			// 
			tapMsg(e) {
				// console.log(5, e);
			},
			// 分享
			tapShare(e) {
				// console.log(6, e);
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
			// 倒计时
			async howtime(start_time) {
				let nowtime = new Date() //获取当前时间
				let endtime = new Date(start_time*1000); //定义结束时间
				let lefttime = endtime.getTime() - nowtime.getTime() //距离结束时间的毫秒数	
					if(lefttime <= 0) {
						let res = await this.getVideo(this.live.id)
						if(res.code == 1) {
							this.live = res.data;
						}
						this.getZanNum();
						this.zanCommit();	// 开启数据定时器
						clearInterval(this.count_down_interval);
						this.count_down_interval = null;
						return;
					}
				this.count_down.leftd = Math.floor(lefttime/(1000*60*60*24)) //计算天数		
				this.count_down.lefth = Math.floor(lefttime/(1000*60*60)%24) //计算小时数		
				this.count_down.leftm = Math.floor(lefttime/(1000*60)%60), //计算分钟数		
				this.count_down.lefts = Math.floor(lefttime/1000%60); //计算秒数
				// return leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
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
			
			// 分享
			onShareAppMessage(options){
				console.log('onShareAppMessage')
			　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			　　var shareObj = {
			　　　　title: this.live.title,        // 默认是小程序的名称(可以写slogan等)
			　　　　path: '/' + this.page_path + '?id=' + this.live.id,        // 默认是当前页面，必须是以‘/’开头的完整路径
			　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			　　　　success: res => {
			　　　　　　// 转发成功之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
			　　　　　　}
			　　　　},
			　　　　fail: () => {
			　　　　　　// 转发失败之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
			　　　　　　　　// 用户取消转发
			　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
			　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
			　　　　　　}
			　　　　},
			　　　　complete: () => {
			　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
			　　　　}
			　　};
			　　// 来自页面内的按钮的转发
			　　if( options.from == 'button' ){
			　　　　var eData = options.target.dataset;
			　　　　console.log( eData.name );     // shareBtn
			　　　　// 此处可以修改 shareObj 中的内容
			　　　　shareObj.path = '/' + this.page_path + '?id=' + this.live.id;
			　　}
			　　// 返回shareObj
			　　return shareObj;
			},
			
			// 间隔上传点赞数据
			zanCommit() {
				this.zan_interval = setInterval(() => {
					if(this.zan_click == 0) {return;}
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

<style lang="less" scoped>
	.index {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
		background-color: #333333;
		height: 100vh;
	}

	.tabbar {
		.action {
			.plus {
				image {
					width: 100upx;
					height: 60upx;
				}
			}
		}
	}

	.content {
		width: 100%;
		position: relative;
	}

	// 视频区域样式
	.video-area {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
	}
	
	// 隐藏vz插件自带倒计时
	/deep/ .video-component--live-reminder-window {
		display: none !important;
	}
	// 新版本兼容
	/deep/ .component-index--live-reminder-window, /deep/ .video-component-index--live-reminder-window {
		display: none !important;
	}

	// 直播预告计时器样式 start
	.time-box {
		position: absolute;
		top: 167rpx;
		left: 50%;
		transform: translateX(-50%);
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
	}
	// 直播预告计时器样式 end

	/* 视频顶部控件 样式 */
	.topbar {
		position: absolute;
		top: 38rpx;
		left: 0;
		width: 100%;
		height: 100rpx;
		
		.anchor-msg {
			background: rgba(0,0,0, 0.37);
			width: 267rpx;
			height: 73rpx;
			.avater {
				width: 70rpx;
				height: 70rpx;
			}
		}
		// 直播中状态标签样式
		.liveing {
			width: 188rpx;
		}
	}

	.topbar .img {
		display: inline-block;
		margin-bottom: unset;
	}
	
	.cu-tag.badge {
		right: -25rpx;
	}

	.topbar .content {
		width: 100%;
		height: 100%;
	}

	.avatar {
		position: absolute;
		left: 0;
		width: 400rpx;
		background-color: rgba(113, 113, 113, 0.5);
	}

	.avatar .view-left-text {
		display: inline-block;
		.eyes-icon {
			width: 28rpx;
			height: 15rpx;
		}
	}

	.status-tag {
		width: 150rpx;
		height: 58rpx;
		font-size: 24rpx;
		position: absolute;
		right: 0;
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
	.live-trailer {
		margin-right: 8rpx;
		width: 24rpx;
		height: 24rpx;
		padding-right: 8rpx;
		background-image: url(/static/img/live_trailer.png);
		background-size: contain;
		background-repeat: no-repeat;
	}
	
	.live-history {
		margin-right: 8rpx;
		width: 24rpx;
		height: 24rpx;
		padding-right: 8rpx;
		background-image: url(/static/img/live_history.png);
		background-size: contain;
		background-repeat: no-repeat;
	}


	/* 评论区 样式 */
	/deep/ .component--live_bottom.component--focus,/deep/ .im-component-component--live_bottom.im-component-component--focus {
		height: auto;
		background: rgba(0,0,0,0);
	}
	// 新版本兼容
	/deep/ .index--live_bottom.index--focus,.im-component-index--live_bottom.im-component-index--focus {
		background: rgba(0,0,0,0);
	}
	.comment-input {
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 5000px;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background: rgba(161, 161, 161, 0.37);
		width: 480rpx;
		// display: inline-block;
		input {
			line-height: 60rpx;
			margin-right: 20rpx;
			border-right: 1rpx solid rgba(161, 161, 161, 0.37);
		}
	}

	.send-btn {
		// width: 50rpx;
		// height: 40rpx;
		border-radius: unset !important;
		background: rgba(113, 113, 113, 0) !important;

	}

	.send-btn-text {
		// height: 60rpx;
		// line-height: 60rpx;
		font-size: 26rpx;
		color: rgba(203, 203, 203, 0.8);
	}

	.swiper {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
	}

	.video {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.play {
		position: absolute;
		width: 20vw;
		height: 20vw;
		left: 40vw;
		top: 40vh;
		opacity: 0.5;
	}

	.progressBar {
		border-radius: 2upx;
		height: 4upx;
		background-color: #FF4500;
		z-index: 999999;
		position: absolute;
		bottom: 68rpx;
	}

	.cover-view-left {
		position: absolute;
		margin-left: 20upx;
		width: 580upx;
		height: 36vh;
		bottom: 60upx;
		z-index: 9999;
		font-size: 28rpx;
		color: #ffffff;
	}

	.left-text {
		font-size: 28rpx;
		color: #ffffff;
	}


	/* 右侧信息栏 样式 */
	.cover-view-right {
		padding-left: 50vw;
		padding-top: 200px;
		position: absolute;
		bottom: 40px;
		right: 30upx;
		z-index: 9999;
		text-align: center;
		pointer-events: none;
		/* 穿透 */
	}

	.avater {
		border-radius: 50%;
		border-width: 2px;
		border-style: solid;
		border-color: #ffffff;
	}

	.img {
		height: 90upx;
		width: 90upx;
		margin-bottom: 110upx;
	}

	.img-left {
		width: 70upx;
		height: 70upx;
		padding-left: 4px;
	}
	
	.zan-badge {
		z-index: 100;
		border: 2rpx solid white
	}

	.right-follow {
		position: absolute;
		z-index: 100;
		top: 475rpx;
		right: 33rpx;
		color: #ffffff;
		font-size: 16px;
		width: 34upx;
		height: 34upx;
		background-color: #f12f5b;
		text-align: center;
		line-height: 34upx;
		border-radius: 17upx;
	}

	.right-text {
		color: #ffffff;
		font-size: 11px;
		text-align: center;
		margin-bottom: 40upx;
	}

	.musicIcon {
		margin-top: 40upx;
	}

	@keyframes rotating {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.view-left-text-content {
		flex: 1;
		height: 428rpx;
	}

	.view-left-text {
		width: 200rpx;
		color: #ffffff;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		.live-title {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 44rpx;
			overflow: hidden;
			width: 200rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.live-viewer-msg {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
		}
	}
	
	.text-content-text.tip-msg {
		color: #FFCA09;
		padding: 20rpx;
		
	}

	.text-content-text {
		color: #ffffff;
		font-size: 28rpx;
		/* line-height: 60rpx; */
		/* height: 60rpx; */
		/* overflow: hidden; */
		background-color: rgba(0, 0, 0, 0.3);
		/* text-overflow: ellipsis; */
		margin-bottom: 12rpx;
		border-radius: 16rpx;
		white-space: pre-wrap;
		padding: 10rpx 25rpx 10rpx 25rpx;
		min-height: 44rpx;
		min-width: 286rpx;
		max-width: 400rpx;
		
		.comment_sender {
			font-size: 26rpx;
		}
	}

	cover-view {
		overflow: auto !important;
	}
</style>
