<template>
	<view>
		
		<swiper class="swiper" autoplay="false" vertical="true" interval="990000" @change="changeVideo">
			<swiper-item v-for="(item,index) in video_list" :key="item.id">

				<video
					:src="item.video_url"
					preload
					show-play-btn="true"
					:controls="false"
					loop="true"
					:id="`video_${item.video_id}`"
					objectFit="contain"
					:enable-progress-gesture="false"
					@click="clickVideo"
					ref="video_url"
					play-btn-position="center"
					class="video"
					:poster="item.cover_url"
					@timeupdate="timeupdate">
				</video>
				
				<cover-image 
				class="play" v-if="show_play" 
				@tap="videoPlay"
				src="/static/video/play_1.png"></cover-image>
				
				<!-- 视频顶部控件 -->
				<view class="topbar">
					<view class="p-relative content">
						<view class="avatar round margin-left height-fill">
							<image :src="item.cover_url?item.cover_url:''"
							 class="avater img" 
							 @click.stop="tapAvater">?</image>
							<view class="view-left-text">
								<view>{{ item.nickname }}</view>
								<view class="text-sm">👁18.7万人观看</view>
							</view>
						</view>
						<view class="status-tag bg-gradual-red round text-center padding-sm margin-right flex align-center">
							<view class="icon-living"></view>正在直播
						</view>
					</view>
				</view>
				
				<!-- 评论区 -->
				<view class="cover-view-left">
					<view class="view-left-text">@{{ item.nickname }}</view>
					<view v-if="isrefresh" class="view-left-text-content">
						<view v-for="(item,index) in item.video_describes" :key="index" class="text-content-text">{{ item }}</view>
					</view>
					<view class="flex align-center">
						<input type="text" class="comment-input" placeholder="说点什么吧" v-model="send_comment" />
						<button class="send-btn" type="default" @click.stop="addComment"><view class="send-btn-text">发送</view></button>
					</view>
				</view>
				
				<!-- 右侧信息栏 -->
				<view class="cover-view-right">
					<!-- <cover-image :src="item.cover_url?item.cover_url:''"
					 class="avater img" 
					 @click.stop="tapAvater">?</cover-image>
					
					<cover-view class="right-follow">+</cover-view> -->
					
					
					<cover-image src="/static/video/ay2.png" 
					style="height: 80upx;" class="img-left" @click.stop="tapMsg"></cover-image>
					<cover-view class="right-text">{{ item.pinglun }}</cover-view>
					
					<zan-animate :zan_click="zan_click"></zan-animate>
					<cover-image 
					style="position:relative;top:-20upx;"
					:src="item.is_dianzan ? '/static/video/axc.png' : '/static/video/bed.png'" 
					class="img-left" @click.stop="tapLove"></cover-image>
					<cover-view class="right-text">{{ item.dianzan }}</cover-view>
					
					
					<cover-image src="/static/video/b6p.png" 
					style="height: 76upx;" class="img-left" @click.stop="tapShare"></cover-image>
					<cover-view class="right-text">{{ item.zhuanfa }}</cover-view>
					
					<cover-image src="/static/video/changpian.png" class="musicIcon img">
					</cover-image>
					
					<!-- <cover-view class="progressBar" :animation="animationData" ></cover-view> -->
									
				</view>

			</swiper-item>
		</swiper>
		<live-player
		  src="https://domain/pull_stream"
		  autoplay
		  @statechange="statechange"
		  @error="error"
		  style="width: 300px; height: 225px;"
		/>
	</view>
</template>
<script>
	import zanAnimate  from '@/components/zan-animate/zan-animate.vue';
let play = false;
export default {
	components:{
		'zan-animate': zanAnimate
	},
	props: {
		video_list: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			time: 0,
			barWidth:0,
			animationData: {},
			times:null,
			play: false,
			show_play:false,
			current_index: 0,
			zan_click: 1,
			send_comment: '' ,// 输入框内容,
			isrefresh: true,
		};
	},
	created() {
		setTimeout(()=>{
			play = true;
			this.videoPlay();
		},1000)
	},
	methods: {
		timeupdate(event) {
			let t_w = parseInt(this.width);
			this.duration = event.detail.duration;
			this.time = event.detail.currentTime;
			let width = (this.time / this.duration) * t_w;
			let w = 0;
		},
		clickVideo() {
			// console.log('单视频点击事件');
			this.videoPlay();
		},
		videoPlay() {
			let video_id = this.video_list[this.current_index].video_id;
			
			if (play) {
				console.log('播放视频',`video_${video_id}`);
				this.videoCtx = uni.createVideoContext(`video_${video_id}`, this);
				this.videoCtx.play();
				this.show_play = false;
				play = false;
			} else {
				console.log('暂停视频',`video_${video_id}`);
				this.videoCtx = uni.createVideoContext(`video_${video_id}`, this);
				this.videoCtx.pause();
				this.show_play = true;
				play = true;
			}
		},
		videoPause() {
			let video_id = this.video_list[this.current_index].video_id;
			this.videoCtx = uni.createVideoContext(`video_${video_id}`, this);
			this.videoCtx.pause();
			this.show_play = true;
			play = true;
		},
		changeVideo(e){
			
			// 暂停之前的视频
			this.videoPause();
			this.current_index = e.detail.current;
			// console.log(e.detail.current);
			// 播放现在的视频
			this.videoPlay();
			
			// 判断是否第一条
			if( e.detail.current == 0 ){
				console.log('到顶了');
				return false;
			}
			
			// 判断是否最后一条
			if( e.detail.current == this.video_list.length-1 ){
				console.log('到底了');
				return false;
			}
			
		},
		tapMsg(e) {
			// console.log(5, e);
		},
		tapShare(e) {
			// console.log(6, e);
		},
		tapLove(e) {
			// item.is_dianzan
			this.video_list[this.current_index].is_dianzan = !this.video_list[this.current_index].is_dianzan;
			// console.log(7, e);
			this.zan_click++;
		},
		
		// 加评论
		addComment(){
			this.$emit('addComment',this.send_comment)
			this.send_comment = '';
			// let content = this.send_comment;
			// console.debug(this.video_list[0].video_describes)
			// if(content) {
			// 	if(this.video_list[0].video_describes.length<=3) {
			// 		this.video_list[0].video_describes.push(content);
			// 		this.send_comment = '';
			// 	} else {
			// 		this.video_list[0].video_describes.push(content);
			// 		this.video_list[0].video_describes = this.video_list[0].video_describes.slice(-4)
			// 		this.send_comment = '';
			// 	}
				
			// }
		},
		
		statechange(e){
		            // console.log('live-player code:', e.detail.code)
		        },
		        error(e){
		            console.error('live-player error:', e.detail.errMsg)
		        }
		
	},
	watch: {
		play(newVal, oldVal) {
			this.videoPlay();
		}
	}
};
</script>

<style scoped>
	/* 视频顶部控件 样式 */
	.topbar {
		position:absolute;
		top: 156rpx;
		left: 0;
		width: 100%;
		height: 100rpx;
	}
	.topbar .img{
		display: inline-block;
		margin-bottom: unset;
	}
	.topbar .content {
		width: 100%;
		height: 100%;
	}
	.avatar {
		position:absolute;
		left: 0;
		width: 400rpx;
		background-color: rgba(113,113,113,0.5);
	}
	.avatar .view-left-text{
		display: inline-block;
	}
	.status-tag {
		position:absolute;
		right: 0;
	}
	.icon-living {
		display: inline-block;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background-image: url(/static/img/icon_live_154ee.png);
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
	
	
	/* 评论区 样式 */
	.comment-input {
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 5000px;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: rgba(113,113,113,0.5);
		width: 400rpx;
		display: inline-block;
	}
	.send-btn {
		width: 150rpx;
		height: 60rpx;
		background: rgba(113,113,113,0.5) !important;
		
	}
	.send-btn-text {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: white;
	}
	
	
.swiper{
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
.play{
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
	bottom: 110upx;
	z-index: 9999;
	font-size: 14px;
	color: #ffffff;
}
.left-text {
	font-size: 14px;
	color: #ffffff;
}


/* 右侧信息栏 样式 */
.cover-view-right {
	padding-left: 50vw;
	padding-top:200px;
	position: absolute;
	bottom: 40px;
	right: 30upx;
	z-index: 9999;
	text-align: center;
	pointer-events: none; /* 穿透 */
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
	width: 80upx;
	height: 66upx;
	padding-left: 4px;
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
}
.view-left-text {
	color: #ffffff;
	font-size: 18px;
	margin-bottom: 10upx;
	font-weight: bold;
}
.text-content-text {
	color: #ffffff;
	font-size: 16px;
	/* line-height: 60rpx; */
	/* height: 60rpx; */
	width: 500rpx;
	/* overflow: hidden; */
	background-color: rgba(113,113,113,0.5);
	/* text-overflow: ellipsis; */
	margin-bottom: 10rpx;
	border-radius: 10rpx;
	white-space: pre-wrap;
	padding: 10rpx;
}
cover-view {
	overflow: auto !important;
}
</style>
