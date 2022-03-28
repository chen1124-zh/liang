<template>
	<view class="bg-white">
		<!-- 标题栏 -->
		<cu-custom isBack bgColor="bg-blue">
			<view slot="content">
				<text class="text-top-title">总直播专题</text>
			</view>
		</cu-custom>
		<view>
			<view v-for="(item,index) in specials" class="series-topic padding-lr">
				<view class="top-bar padding-tb flex justify-between align-center">
					<view class="text-xl text-bold top-title">{{item.title}}</view>
					<view class="text-sm flex align-center text-grey">
						<view class="p-relative tag padding-xs text-lg" style="white-space: nowrap;" @click="toSpecial(item.id,index)">
							查看全部
							<view  v-if="item.state.end || item.state.underway || item.state.no_start"  class="cu-tag badge"></view>
						</view>
						<view class="text-lg"><text class="cuIcon-right"></text></view>
					</view>
				</view>
				<view class="grid col-2 flex justify-between">
					<view class="topic" v-for="live in item.topic" :key="live.id" @click="toLiveRoom(live.id, live.type)">
						<view class="topic-img">
							<image :src="live.banner" mode="aspectFill"></image>
						</view>
						<view class="topic-text margin-top">{{live.title}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="footer">
			<view class="width-fill flex align-center justify-center padding-xl">
				<view class="line"></view>
				<view class="text-grey">到底啦~</view>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNavList
	} from "@/apis/index.js"
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				specials: []
			}
		},
		onLoad(e) {
			let params = {
				parent_id: e.parent_id
			}
			if(this.$store.getters.userInfo) {
				params['user_id'] = this.$store.getters.userInfo.id
			}
			getNavList(params).then(res => {
				// console.debug(res)
				this.specials = res.data;
			}).catch(err => {
				console.error(err)
			})
		},
		methods: {
			// 跳页判断
			toLiveRoom(live_id, live_type) {
				if(live_type == 2) {
					this.$mUtils.jumpPage('/pages/live/liveImageText/liveImageText', {id: live_id})
				} else {
					this.$mUtils.jumpPage('/pages/live/live', {id: live_id})
				}
			},
			toSpecial(id,index) {
				this.specials[index].state = {};
				this.$mUtils.jumpPage('/pages/live/specialTopic/specialTopic',{id: id})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: white;
	}
	.series-topic {
		box-shadow: 0rpx 12rpx 5rpx 0rpx rgba(40, 140, 176, 0.1);
		padding-bottom: 25rpx;
		
		.top-title {
			letter-spacing: 5rpx;
		}
		.topic {
			width: 333rpx;
		}
		.topic-img {
			width: 100%;
			height: 190rpx;
			border-radius: 12rpx;
			box-shadow: 0rpx 12rpx 10rpx 1rpx rgba(60, 154, 248, 0.1);
			image {
				width: 100%;
				height: 190rpx;
				border-radius: 12rpx;
			}
		}
		.topic-text {
			font-size: 25rpx;
			font-weight: 500;
			color: #333333;
			line-height: 36rpx;
		}
	}
	.footer {
		.line {
			width: 144rpx;
			height: 2rpx;
			background: #DDDDDD;
		}
	}

</style>
