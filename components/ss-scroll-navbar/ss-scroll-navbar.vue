<template>
	<view class="title-bar">
		<scroll-view class="ss-scroll-navbar" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
			<view
			v-for="(item, index) in navArr" 
			:key="item.category_id" 
			class="nav-item"
			:class="{current: index === tabCurrentIndex}"
			@click="tabChange(index)"
			:id="'item-' + index"
			>
				<view class="title" style="display: flex;align-items: center;">
					<view style="position:relative;line-height: 40rpx;">
						<text>{{item.title}}</text>
						<view v-if="item.state.end || item.state.underway || item.state.no_start" class="cu-tag badge"></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="more-icon text-xl" @click="clickIcon"><text class="cuIcon-unfold text-lg text-bold"></text></view>
		<view class="under-line"></view>
	</view>
</template>

<script>
	export default {
		name: 'ss-scroll-navbar',
		props: {
			navArr: {
				type: Array,
				default () {
					return [
						{
							title: '热门',
							category_id: '1'
						}, {
							title: '发布会',
							category_id: '2'
						}, {
							title: '峰会',
							category_id: '3'
						}, {
							title: '论坛',
							category_id: '4'
						}, {
							title: '沙龙',
							category_id: '5'
						}, {
							title: '专题',
							category_id: '6'
						}, {
							title: '路演',
							category_id: '7'
						}, {
							title: '座谈',
							category_id: '8'
						}, {
							title: '专访',
							category_id: '9'
						}, {
							title: '研讨',
							category_id: '10'
						}, {
							title: '盛典',
							category_id: '11'
						}, {
							title: '其他',
							category_id: '12'
						}
					]
				}
			},
			tabCurrentIndex: {
				type: Number,
				default: 0
			}
		},
		watch: {
			tabCurrentIndex(n,o){
				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < n + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[n];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -=  this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			}
		},
		data () {
			return {
				scrollLeft: 0,
				widthList: [],
				screenWidth: 0
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange (index) {
				this.$emit('navbarTap', index);
				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -=  this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth () {
				var that = this;
				var arr = [];
				let w = 0;
				this.navArr.forEach((item, index) =>{
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						arr.push(data.width);
					}).exec();
				})
				this.widthList = arr;
			},
			calculateWindowWidth () {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
			},
			clickIcon() {
				this.$emit('clickIcon');
			}
		},
		created () {
			var that = this;
			this.calculateWindowWidth();
			setTimeout(function() {
				that.calculateItemWidth();
			}, 1000);
		}
	}
</script>

<style lang="scss" scoped>
	
	$scroll-navbar-h: 80rpx;	// 顶部导航条高度
	.title-bar {
		position: relative;
		display: flex;
		.more-icon {
			height: $scroll-navbar-h;
			width: $scroll-navbar-h;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			padding-bottom: 10rpx;
		}
		.under-line {
			height: 1rpx;
			width: 90%;
			background-color: #999999;
			opacity: 0.5;
			margin: 0 auto;
			position: absolute;
			bottom: 1rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.ss-scroll-navbar {
		width: calc(100% - #{$scroll-navbar-h});
		height: $scroll-navbar-h;
		// box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		white-space:nowrap;
		padding-bottom: 10rpx;
		
		.nav-item {
			height: calc(#{$scroll-navbar-h} - 10rpx);
			text-align: center;
			padding: 0upx 20upx;
			color: #303133;
			display: inline-block;
			position: relative;
			font-size: 36upx;
			
			.title {
				line-height: calc(#{$scroll-navbar-h} - 10rpx);
				height: calc(#{$scroll-navbar-h} - 10rpx);
			}
			
			// &:after{
			// 	content: '';
			// 	width: 0;
			// 	height: 0;
			// 	border-bottom: 6rpx solid #0681eb;
			// 	position: absolute;
			// 	left: 50%;
			// 	bottom: 0;
			// 	transform: translateX(-50%);
			// 	transition: .3s;
			// }
		}
		
		.current{
			color: #0681eb;
			font-size: 40rpx;
			font-weight: 600;
			/* font-weight: bold; */
			background: #0681eb;
			color: white;
			border-radius: 0 0 10rpx 10rpx;
			// &:after{
			// 	width: 50%;
			// }
		}
	}
	.default-text {
		font-size: 32rpx;
	}
</style>
