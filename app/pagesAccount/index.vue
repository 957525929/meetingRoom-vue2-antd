<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">入账资产清单</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav cf">
			<view class="cu-item fl" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list"
				:key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
			<view class="fr padding text-lg">
				<text class="cuIcon-roundadd text-black" @tap="add"></text>
			</view>
		</scroll-view>

		<view v-if="TabCur==0" class="itembox">
			<itemCard :cardTypy='TabCur'></itemCard>
		</view>
		<view v-if="TabCur==1" class="itembox">
			2
		</view>
		<view v-if="TabCur==2" class="itembox">
			3
		</view>
		<view v-if="TabCur==3" class="itembox">
			4
		</view>
	</view>
</template>

<script>
	import itemCard from './components/itemcard.vue'
	
	export default {
		components:{
			itemCard,
		},
		data() {
			return {
				list: ['全部', '审核中', '合格', '不合格'],
				TabCur: 0,
				scrollLeft: 0,
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			add() {
				uni.navigateTo({
					url: './addaccount'
				})
			},
		}
	}
</script>

<style>
	
</style>
