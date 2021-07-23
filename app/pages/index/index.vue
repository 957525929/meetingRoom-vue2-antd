<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<scan v-if="PageCur=='scan'"></scan>
		<person v-if="PageCur=='person'"></person>

		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur=='home'?'text-green cuIcon-homefill':'text-gray cuIcon-home'"></text>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>

			<view class="action" @click="NavChange" data-cur="scan">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur=='scan'?'text-green cuIcon-circlefill':'text-gray cuIcon-circle'"></text>
				</view>
				<view :class="PageCur=='scan'?'text-green':'text-gray'">扫码</view>
			</view>

			<view class="action" @click="NavChange" data-cur="person">
				<view class='cuIcon-cu-image'>
					<text :class="PageCur=='person'?'text-green cuIcon-peoplefill':'text-gray cuIcon-people'"></text>
				</view>
				<view :class="PageCur=='person'?'text-green':'text-gray'">个人中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget)
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
