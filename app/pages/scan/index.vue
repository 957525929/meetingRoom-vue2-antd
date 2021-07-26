<template>
	<view>
		扫码页面
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.scanCode({
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				},
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
