<template>
	<view>
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-blue" isBack>
			<view slot="content">
				<text class="text-top-title">联系我们</text>
			</view>
		</cu-custom>
		<view class="padding-top p-relative">
			<view class="padding-left text-lg">意见和问题</view>
			<view class="flex justify-center margin-top-sm">
				<textarea name="" id="" placeholder="请输入您要反馈的问题" cols="30" rows="10" v-model="text"></textarea>
			</view>
			<image class="textarea-bg" src="../../static/img/user/textarea_bg.png" mode="aspectFit"></image>
		</view>
		<view class="flex flex-direction padding-xl">
			<button class="cu-btn bg-blue lg" @click="commitContact">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		addLeave
	} from "@/apis/index.js"
	export default {
		data() {
			return {
				text: ""
			}
		},
		methods: {
			commitContact() {
				if(!this.text.trim()) {
					uni.showToast({
						title: '请输入要反馈的问题',
						icon: 'none'
					});
					return;
				}
				addLeave({
					content: this.text.trim()
				}).then(res => {
					if(res.code == 200) {
						this.text = "";
						uni.showToast({
							title: res.msg
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: white;
	}
	textarea {
		width: 692rpx;
		height: 371rpx;
		padding: 10rpx;
		border: 1rpx solid #cccccc
	}
	.textarea-bg {
		width: 100%;
		height: 181rpx;
		position: absolute;
		bottom: 0;
	}

</style>
