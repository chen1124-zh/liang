<template>
	<view class="page bg-white">
		<!-- 标题栏 -->
		<cu-custom isBack bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">泥燕直播</text>
			</view>
		</cu-custom>
		<view :style="{height: 'calc(100vh - ' + CustomBar + 'px )'}">
			<view class="flex justify-between align-center padding-left top-bar">
				<view class="text-lg text-bold">直播列表</view>
				<view class="text-xl right-icon flex align-center justify-center"
					@click="backHome">
					<text class="cuIcon-fold"></text>
				</view>
			</view>
			<view class="grid col-3">
				<view v-for="tag in navList" :key="tag.category_id" class="flex justify-center">
					<view 
					class="cu-tag bg-gray round tag margin-tb-xs" 
					:class="tag.category_id == current_category? 'active':''"
					@click="selectNav(tag.category_id)">
						{{tag.title}}
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
				navList: [{
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
				}],
				current_category: 1
			}
		},
		eventChannel: null,
		onLoad(e) {
			this.eventChannel = this.getOpenerEventChannel()
			this.eventChannel.on('acceptDataFromOpenerPage', (data) => {
			    this.current_category = data.category_id;
			 });
		},
		methods: {
			selectNav(category_id) {
				this.current_category = category_id;
				this.backHome()
			},
			backHome() {
				this.eventChannel.emit('acceptDataFromOpenedPage', {category_id: this.current_category}); // 给上个页面传值
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-bar {
		height: 80rpx;
		.right-icon {
			height: 80rpx;
			width: 80rpx;
		}
	}
	.tag {
		width: 187rpx;
		height: 60rpx;
		background: #F5F5F5;
	}
	.tag.active {
		background: #0681EB;
		color: white;
	}
</style>
