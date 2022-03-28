<template>
	<view class="page bg-white">
		<!-- 标题栏 -->
		<!-- <cu-custom bgColor="bg-blue">
			<view class="flex align-center justify-center" slot="content">
				<text>足迹</text>
				<text class="text-top-title">泥燕直播</text>
			</view>
		</cu-custom> -->
		
		<view class="swiper_title_block">
			
			<view class="title_block">
				<view class="title_block_content">
					<text class="footprint">历史</text>
					<text class="text-top-title">泥燕直播</text>
				</view>
			</view>
			
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
			</swiper>
			
		</view>
		
		<view class="lattice">
			<view class="title_more">
				<view class="left">
					<view class="icon">
						<image src="../../static/img/add.png" mode=""></image>
					</view>
					<view class="name">
						<text>直播预告</text>
						
						<view class="line">
							
						</view>
					</view>
				</view>
				
				<view class="more">
					查看更多<view class="icon"><image src="../../static/img/add.png" mode=""></image></view>
				</view>
			</view>
			
			
			
			<view class="notice_all_box">
				<view class="item_notice">
					<view class="img">
						<image src="../../static/adv.png" mode=""></image>
					</view>
					<view class="content">
						jiafdsfasdfsdafasdfsdafasf
					</view>
					<view class="timi">
						03-25 09:00
					</view>
					<view class="book">
						预约
					</view>
				</view>
				
				<view class="item_notice">
					<view class="img">
						<image src="../../static/adv.png" mode=""></image>
					</view>
					<view class="content">
						jiafdsfasdfsdafasdfsdafasf
					</view>
					<view class="timi">
						03-25 09:00
					</view>
					<view class="book">
						预约
					</view>
				</view>
				
				<view class="item_notice">
					<view class="img">
						<image src="../../static/adv.png" mode=""></image>
					</view>
					<view class="content">
						jiafdsfasdfsdafasdfsdafasf
					</view>
					<view class="timi">
						03-25 09:00
					</view>
					<view class="book">
						预约
					</view>
				</view>
				
				
				
			</view>
		</view>
		
		<view class="lattice">
			<view class="title_more">
				<view class="left">
					<view class="icon">
						<image src="../../static/img/add.png" mode=""></image>
					</view>
					<view class="name">
						<text>热点咨讯</text>
						
						<view class="line">
							
						</view>
					</view>
				</view>
				
				<view class="more">
					查看更多<view class="icon"><image src="../../static/img/add.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		
		<view class="lattice">
			<view class="title_more">
				<view class="left">
					<view class="icon">
						<image src="../../static/img/add.png" mode=""></image>
					</view>
					<view class="name">
						<text>直播日历</text>
						
						<view class="line">
							
						</view>
					</view>
				</view>
				
				<view class="more">
					查看更多<view class="icon"><image src="../../static/img/add.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		<view class="lattice">
			<view class="title_more">
				<view class="left">
					<view class="icon">
						<image src="../../static/img/add.png" mode=""></image>
					</view>
					<view class="name">
						<text>精选推荐</text>
						
						<view class="line">
							
						</view>
					</view>
				</view>
				
				<view class="more">
					查看更多<view class="icon"><image src="../../static/img/add.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		<view class="lattice">
			<view class="title_more">
				<view class="left">
					<view class="icon">
						<image src="../../static/img/add.png" mode=""></image>
					</view>
					<view class="name">
						<text>直播专题</text>
						
						<view class="line">
							
						</view>
					</view>
				</view>
				
				<view class="more">
					查看更多<view class="icon"><image src="../../static/img/add.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		
		<view class="lattice">
			<view class="title_more">
				<view class="left">
					<view class="icon">
						<image src="../../static/img/add.png" mode=""></image>
					</view>
					<view class="name">
						<text>精彩回放</text>
						
						<view class="line">
							
						</view>
					</view>
				</view>
				
				<view class="more">
					查看更多<view class="icon"><image src="../../static/img/add.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		
		
		
		
		<!--
		<view class="header" >
			
			<ss-scroll-navbar :navArr="navList" :tabCurrentIndex="currentIndex" @navbarTap="navbarTapHandler1"
				@clickIcon="toNavPage">
			</ss-scroll-navbar>
		
			
			<view class="padding-tb-sm tag-box">
				<view v-for="tag in tags" :key="tag.type" @tap="selectTag" :data-type="tag.type"
					class="padding-lr-sm margin-lr-sm p-relative tag">
					<text class="text-xl" :class="video_type == tag.type ? '':'text-gray'">{{tag.name}}</text>
					<view v-if="stateTag(tag.type)" class="cu-tag badge"></view>
				</view>
			</view>
		</view>
		
		<view  @touchstart="start" @touchend="end" :style="{marginTop: '160rpx', minHeight: `calc(100vh - 160rpx - 100px)`}">
			
			<view class="cu-card case">
				<view v-for="video in videoList" :key="video.id" class="padding-bottom flex flex-wrap justify-center">
					<view class="margin-bottom" style="height: 1rpx;width: 100%;transform: scale(0.8);background-color: #ccc;"></view>
					<view class="cu-item bg-white border-bottom video-card"
						@click="toLiveRoom(video.id,video.type)">
						<view class="image">
							<view class="trademark">
								<image :src="video.author_image" class="bg-black mark margin-lr-xs round" mode="aspectFill">
								</image>
							</view>
							<image :src="video.banner" mode="aspectFill"></image>
							<view class="cu-tag round margin-top margin-right flex align-center"
								style="padding-right:0;padding-left: 0; background: rgba(0,0,0,0.3);">
								<view class="flex align-center justify-center text-white live-hot-total">
									<text style="padding-top: 4rpx">{{$mUtils.transformNum(video.viewers)}}</text>
								</view>
								//直播中
								<view v-if="video.status == 1 || video.status == 2"
									class="bg-gradual-orange flex align-center justify-center live-status">
									<text class="icon-living"></text> {{video.status_cn}}
								</view>
								//预告/未开始
								<view v-if="video.status == -1"
									class="bg-gradual-blue flex align-center justify-center live-status">
									<text class="live-trailer"></text> {{video.status_cn}}
								</view>
								//回放/已结束
								<view v-if="video.status == 0"
									class="bg-gradual-green flex align-center justify-center live-status">
									<text class="live-history"></text> {{video.status_cn}}
								</view>
							</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{video.title}}</text></view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								//<view class="cu-avatar round lg" :style="'background-image'+':url(' + video.author_image + ');'"></view> 
								//<view class="cu-avatar round lg" :style="{backgroundImage:'url(' + video.author_image + ')'}"></view>
								<view class="cu-avatar round" :style="[{backgroundImage:'url(' + video.author_image + ')'}]">
								</view>
								<view class="content flex-sub flex">
									<view class="padding-right text-xl"><text class="text-cut">{{video.author_name}}</text></view>
									<view class="text-grey">{{video.start_time_cn}}</view>
									<view class="text-gray text-sm flex justify-between">
										{{video.start_time_cn}}
										<view class="text-gray text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
											<text class="cuIcon-messagefill margin-lr-xs"></text> 30
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		底部弹窗 
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" @click="hideModal">
			<view class="cu-dialog" :style="{height: 'calc(100vh - ' + CustomBar + 'px )'}" @click.stop>
				<view class="flex justify-between align-center padding-left top-bar">
					<view class="text-xl text-bold">直播列表</view>
					<view class="text-xl text-bold right-icon flex align-center justify-center" @click="hideModal">
						<text class="cuIcon-fold"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view>
						<view class="grid col-3">
							<view v-for="tag in navList" :key="tag.id" class="flex justify-center">
								<view class="cu-tag bg-gray round nav-tag margin-tb-xs"
									:class="tag.id == cur_cat_id? 'active':''"
									@click="selectNav(tag.id)">
									<text class="text-cut text-xl">{{tag.title}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		-->
	</view>
</template>

<script>
	import {
		getNavList,
		getTopicList
	} from "@/apis/index.js"
	import videoList from '@/components/list/list.vue';
	import ssScrollNavbar from '@/components/ss-scroll-navbar/ss-scroll-navbar.vue'
	export default {
		components: {
			videoList,
			ssScrollNavbar
		},
		computed: {
			stateTag(){
				return (type) => {
					if(this.navList && this.navList[this.currentIndex] && this.navList[this.currentIndex].state) {
						// console.debug(this.currentIndex,this.navList[this.currentIndex].state,type,this.status_tag)
						return this.navList[this.currentIndex].state[this.status_tag[type]];
					} else {
						return 0;
					}
				}
			}
		},
		data() {
			return {
				
				indicatorDots: true,
				            autoplay: true,
				            interval: 2000,
				            duration: 500,
				
				CustomBar: this.CustomBar,	// 顶部标题栏高度
				videoList: [],
				currentIndex: 0,
				page: 1,	// 分页下标
				pagesize: 10,	// 分页条数
				navList: [{
					title: '热门',
					id: '1'
				}, {
					title: '发布会',
					id: '2'
				}, {
					title: '峰会',
					id: '3'
				}, {
					title: '论坛',
					id: '4'
				}, {
					title: '沙龙',
					id: '5'
				}, {
					title: '专题',
					id: '6'
				}, {
					title: '路演',
					id: '7'
				}, {
					title: '座谈',
					id: '8'
				}, {
					title: '专访',
					id: '9'
				}, {
					title: '研讨',
					id: '10'
				}, {
					title: '盛典',
					id: '11'
				}, {
					title: '其他',
					id: '12'
				}],
				video_type: 'notStart',
				cur_cat_id: null,
				tags: [ {
					type: 'notStart',
					name: '预告'
				}, 
				{
					type: 'living,pause',
					name: '直播中'
				},
				{
					type: 'end',
					name: '回放'
				}],
				status_tag: {
					'living,pause': "underway",
					'notStart':  "no_start",
					'end': "end"
				},
				modalName: null,
				CustomBar: this.CustomBar,
				startData: {
					clientX: '',
					clientY: ''
				}
			};
		},
		onShow() {
			if(this.cur_cat_id) {
				this.page = 1;
				this.videoList = [];
				this.getVideoList(this.cur_cat_id);
			}
		},
		onLoad() {
			this.$store.commit('SET_STATUS_BAR', this.CustomBar);
			// console.debug(this.$store)
			// this.getVideoList(id);
			let params = {}
			if(this.$store.getters.userInfo) {
				params['user_id'] = this.$store.getters.userInfo.id || ''
			}
			// console.debug('params',params,this.$store.getters.userInfo)
			getNavList(params).then(res => {
				// console.debug(res)
				this.navList = res.data;
				this.cur_cat_id = this.navList[0].id;
				this.getVideoList(this.navList[0].id)
			}).catch(err => {
				console.error(err)
			})
		},
		onPullDownRefresh() {
			console.log('refresh');
			// this.getVideoList(true);
			uni.stopPullDownRefresh();
		},
		methods: {
			getVideoList(id) { 
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
				let params = {
					cid: this.cur_cat_id,
					status: this.video_type,
					page: this.page,
					pagesize: this.pagesize,
				}
				if(this.$store.getters.userInfo) {
					params['user_id'] = this.$store.getters.userInfo.id
				}
				getTopicList(params).then(res => {
					// console.debug(res)
					this.videoList = [...this.videoList, ...res.data];
					if(!res.data.length) {this.page--;}
					if(this.navList && this.navList[this.currentIndex].state)
					this.navList[this.currentIndex].state[this.status_tag[this.video_type]] = 0;
					
				}).catch(err => {
					console.error(err)
				})
			},
			navbarTapHandler1(index) {
				this.page = 1;
				this.videoList = [];
				this.currentIndex = index;
				var obj = this.navList[index];
				if(obj.sublevel == 1) {	// sublevel子分类判断有就跳转到专题页面
					this.$mUtils.jumpPage('/pages/live/allTopic/allTopic',{parent_id: obj.id})
				} else {
					this.cur_cat_id = obj.id;
					this.getVideoList(obj.id);
				}
			},
			selectTag(e) { // 筛选视频
				this.page = 1;
				this.videoList = [];
				// console.debug('e', e)
				this.video_type = e.currentTarget.dataset.type;
				this.getVideoList(this.cur_cat_id)
				
			},
			selectNav(id) {
				this.cur_cat_id = id;
				let index = this.navList.findIndex(item => id == item.id);
				this.navbarTapHandler1(index);
				this.hideModal()
			},
			toNavPage() {
				this.modalName = 'bottomModal';
				// uni.navigateTo({
				//   url: '/pages/index/all_nav/all_nav',
				//   events: {
				//     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				//     acceptDataFromOpenedPage: (data) => {
				// 	  let index = this.navList.findIndex(item => data.category_id == item.category_id);
				// 	  this.navbarTapHandler1(index);
				//     }
				//   },
				//   success: (res) => {
				//     // 通过eventChannel向被打开页面传送数据
				//     res.eventChannel.emit('acceptDataFromOpenerPage', { category_id: this.navList[this.currentIndex].category_id })
				//   }
				// });
			},
			// 跳页判断
			toLiveRoom(live_id, live_type) {
				if(live_type == 2) {
					this.$mUtils.jumpPage('/pages/live/liveImageText/liveImageText', {id: live_id})
				} else {
					this.$mUtils.jumpPage('/pages/live/live', {id: live_id})
				}
			},
			hideModal() {
				this.modalName = null;
			},
			
			start(e){
				console.debug(e)
			    this.startData.clientX=e.changedTouches[0].clientX;
			    this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e){
			    // console.log(e)
			    let subX=e.changedTouches[0].clientX-this.startData.clientX;
			    let subY=e.changedTouches[0].clientY - this.startData.clientY;
			    if(subY>50 || subY<-50){
			        console.log('上下滑')
			    }else{
			        if(subX>100){
			            console.log('右滑')
						// console.debug(this.currentIndex)
						if(this.currentIndex >= 1) {
							let index = this.currentIndex - 1;
							this.navbarTapHandler1(index)
						}
			        }else if(subX<-100){
			            console.log('左滑')
						console.debug(this.currentIndex)
						if(this.currentIndex < this.navList.length - 1) {
							let index = this.currentIndex + 1;
							this.navbarTapHandler1(index)
						}
			        }else{
			            console.log('无效')
			        }
			    }
			}
		},
		onReachBottom() {	// 触底加载
			this.page++;
			this.getVideoList(this.cur_cat_id)
		},
	};
</script>
<style lang="scss" scoped>
	
	.page {
		// background-color: white;
		background: #EEEEEE;
	}
	
	.swiper_title_block{
		width: 100%;
		height: 500rpx;
		
		.swiper{
			width: 100%;
			height: 100%;
		}
		
		.title_block{
			// background: #0509e8;
			height: 160rpx;
			width: 100%;
			position: absolute;
			top: 0;
			color: #000;
			padding-bottom: 10rpx;
			box-sizing: content-box;
			
			.title_block_content{
				width: 100%;
				position: absolute;
				bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.footprint{
					position: absolute;
					left: 10rpx;
				}
				
			}
		}
		
	}
	
	.lattice{
		background: #fff;
		
		margin-bottom: 15rpx;
		padding: 40rpx 30rpx;
		.title_more{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				
				.icon{
					width: 40rpx;
					height: 40rpx;
					margin-right: 5rpx;
				}
				
				.name{
					color: #000;
					position: relative;
					font-size: 34rpx;
					font-weight: bold;
					
					text{
						position: relative;
						z-index: 1;
					}
					
					.line{
						width: 100%;
						height: 10rpx;
						position: absolute;
						bottom: 0;
						background: #fadcc4;
						z-index: 0;
					}
				}
				
				
			}
			
			.more{
				color: #333;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				.icon{
					width: 12rpx;
					height: 18rpx;
					margin-left: 10rpx;
				}
			}
		}
	
	
		.notice_all_box{
			display: flex;
			flex-wrap: wrap;
			margin: 22rpx 0;
			overflow-x: auto;
			// width: 1000000rpx;
			.item_notice{
				box-sizing: content-box;
				word-wrap: break-word;	
				width: 210rpx;
				background: #f6f6f6;
				overflow: hidden;
				border-radius: 10rpx;
				margin-right: 20rpx;
				
				display: flex;
				flex-direction: column;
				// justify-content: center;
				align-items: center;
				.img{
					overflow: hidden;
					border-radius: 10rpx;
					width: 100%;
					height: 120rpx;
				}
				
				.content{
					height: 74rpx;
					font-size: 20rpx;
					padding: 14rpx 10rpx;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				
				.timi{
					display: inline-block;
					text-align: center;
					padding: 5rpx 20rpx;
					background: #cceeff;
					color: #459aee;
					border-radius: 30rpx;
					font-size: 25rpx;
				}
				.book{
					font-size: 24rpx;
					padding: 10rpx 30rpx;
					background: #0189ff;
					color: #fff;
					border-radius: 30rpx;
					margin-top: 30rpx;
					margin-bottom: 40rpx;
				}
				
				
			}
		}
	}
	
	image{
		width: 100%;
		height: 100%;
	}
	
	
	// .text-gray {
	// 	color: #cccccc
	// }

	
	
	// .cu-custom .cu-bar .content image {
	//     height: 40rpx;
	//     width: 60rpx;
	// }

	// .image .trademark {
	// 	position: absolute;
	// 	left: 20rpx;
	// 	top: 20rpx;
	// 	z-index: 10;
	// }
	
	// // 页面头部样式 start
	// .header {
	// 	width: 100%;
	// 	position: fixed;
	// 	z-index: 100;
	// 	background-color: white;
	// 	.tag-box {
	// 		height: 80rpx;
	// 	}
	// }
	// // 页面头部样式 end
	
	// .video-card {
	// 	width: 690rpx;
	// 	// height: 462rpx;
	// 	.cu-tag {
	// 		height: 36rpx;
	// 	}
	// 	.image {
	// 		height: 420rpx;
	// 		width: 690rpx;
	// 		border-radius: 10rpx;
	// 		overflow: hidden;
	// 		.cu-bar {
	// 			height: 100rpx;
	// 			overflow: hidden;
	// 		}
	// 		image {
	// 			height: 420rpx !important;
	// 			width: 690rpx;
	// 		}
	// 	}
	// 	.cu-list.menu-avatar {
	// 		height: 72rpx;
	// 		.cu-item {
	// 			height: 72rpx;
	// 			.cu-avatar {
	// 				width: 45rpx;
	// 				height: 45rpx;
	// 				left: 0;
	// 			}
				
	// 			.content {
	// 				left: 58rpx;
	// 				width: 630rpx;
	// 			}
	// 		}
	// 	}
	// 	.cu-list.menu-avatar>.cu-item .content>uni-view:first-child {
	// 		font-size: 30rpx;
	// 	}
	// 	.cu-list.menu-avatar>.cu-item .flex .text-cut {
	// 	    max-width: 325rpx;
	// 	}
	// }

	// .cu-card.case .image .trademark .mark {
	// 	width: 40rpx !important;
	// 	height: 40rpx !important;
	// }

	// .soild-top {
	// 	border-top: 1px solid #555555;
	// }

	// .tag {
	// 	display: inline-block;
	// }

	// .live-hot-total {
	// 	width: 100rpx;
	// 	height: 36rpx;
	// }

	// .live-status {
	// 	height: 36rpx;
	// 	border-radius: 326rpx 160rpx 160rpx 0;
	// 	width: 117rpx;
	// 	font-size: 22rpx;
	// }

	// .icon-living {
	// 	width: 36rpx;
	// 	height: 36rpx;
	// 	border-radius: 50%;
	// 	background-image: url(/static/img/icon_live_fff.png);
	// 	webkit-animation: matchLiving .6s steps(6) infinite;
	// 	animation: matchLiving .6s steps(6) infinite;
	// }

	// @keyframes matchLiving {
	// 	0% {
	// 		background-position: 0 0;
	// 	}

	// 	100% {
	// 		background-position: -108px 0;
	// 	}
	// }

	// .live-trailer {
	// 	width: 24rpx;
	// 	height: 24rpx;
	// 	padding-right: 5rpx;
	// 	background-image: url(/static/img/live_trailer.png);
	// 	background-size: contain;
	// 	background-repeat: no-repeat;
	// }

	// .live-history {
	// 	width: 24rpx;
	// 	height: 24rpx;
	// 	padding-right: 5rpx;
	// 	background-image: url(/static/img/live_history.png);
	// 	background-size: contain;
	// 	background-repeat: no-repeat;
	// }

	// .bg-shadeBottom {
	// 	background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3));
	// 	background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3));
	// 	color: #ffffff;
	// }

	// .bottom-modal {
	// 	.top-bar {
	// 		height: 80rpx;

	// 		.right-icon {
	// 			height: 80rpx;
	// 			width: 80rpx;
	// 		}
	// 	}

	// 	.nav-tag {
	// 		width: 187rpx;
	// 		height: 60rpx;
	// 		background: #F5F5F5;
	// 	}

	// 	.nav-tag.active {
	// 		background: #0681EB;
	// 		color: white;
	// 	}
	// }
</style>
