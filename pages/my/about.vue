<template>
	<view>
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-blue" isBack>
			<view slot="content">
				<text class="text-top-title">关于我们</text>
			</view>
		</cu-custom>
		<view class="padding-tb-sm padding-lr-lg bg-white">
			<rich-text :nodes="nodes_string"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodes_string: null
			}
		},
		onLoad() {
			this.getAboutMsg()
		},
		methods: {
			async getAboutMsg() {
				let res = await this.$apis.getAboutMsg();
				this.nodes_string = res.data.about
			},
			
		}
	}
</script>

<style>
page {
	background-color: white;
}
</style>
