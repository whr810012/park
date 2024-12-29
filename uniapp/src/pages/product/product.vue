<template>
	<view class="product">
		<rf-product-detail @product="getProductDetail" :userInfo="userInfo" :url="currentUrl" :evaluateList="evaluateList"
			:product="productDetail"></rf-product-detail>
		<!--回到顶部-->
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<!-- 404页面 -->
		<view v-if="!productDetail.stallId && !loading">
			<rf-no-data :custom="true">
				<view class="no-data-title">
					{{ '暂无数据' }}
				</view>
				<view @tap="getProductDetail(productDetail.id)" slot="refresh" class="spec-color">重新加载</view>
			</rf-no-data>
		</view>
		<!--顶部下拉菜单-->
		<rf-nav-detail @hide="hideNavDetail" :popupShow="navDetailShow">
		</rf-nav-detail>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>
<script>
import { getStall, getAllArea, getAllEvaluate, getAllMember } from '@/api/request';
import rfProductDetail from '@/components/rf-product-detail';
import rfBackTop from '@/components/rf-back-top';
import rfNoData from '@/components/rf-no-data';
export default {
	components: {
		rfProductDetail,
		rfBackTop,
		rfNoData
	},
	data() {
		return {
			evaluateList:[],
			areaList:[],
			productDetail: {},
			loading: true,
			errorInfo: '',
			userInfo: {},
			scrollTop: 0,
			currentUrl: '',
			navDetailShow: false,
			appName: this.$mSettingConfig.appName
		};
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navDetailShow = true;
		}
	},
	// #endif
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	async onLoad(options) {
		console.log(options);
		this.stallId = options.id;
		console.log(this.stallId);
		this.userInfo = uni.getStorageSync('userInfo') || {};
		await this.initData();
	},
	methods: {
		async getAllEvaluate() {
			await this.$http
				.get(`${getAllEvaluate}`)
				.then(async r => {
					this.evaluateList = r
					this.$http.get(`${getAllMember}`).then(res => {
						res.map(item => {
							this.evaluateList.forEach(item1 => {
								if (item.openId == item1.openId) {
									console.log(item1);
									item1.userName = item.userName
								}
								item1.createTime = this.$mHelper.formatTime(item1.createTime)
								console.log();
							})
						})
						this.evaluateList.filter(item => item.areaid == this.productDetail.areaid)
						console.log(this.evaluateList);
					})
				})
		},
		async getAllArea() {
			await this.$http
				.get(`${getAllArea}`, {})
				.then(async r => {
					this.areaList = r
					this.productDetail.areaName = this.areaList.find(item => item.areaid === this.productDetail.areaid).areaName
				})
				.catch(() => {
				});
		},
		// 隐藏顶部导航
		hideNavDetail() {
			this.navDetailShow = false;
		},
		// 数据初始化
		async initData() {
			await this.getProductDetail();
			this.getAllEvaluate()
		},
		// 获取产品详情
		async getProductDetail() {
			await this.$http
				.get(`${getStall}`, {
					stallId: this.stallId
				})
				.then(async r => {
					this.loading = false;
					this.productDetail = Object.values(r.reduce((acc, item) => {
						// 如果该stallId已经存在，则合并url
						if (!acc[item.stallId]) {
							acc[item.stallId] = { ...item, url: [item.url] }
						} else {
							acc[item.stallId].url.push(item.url)
						}
						return acc
					}, {}))[0]
					console.log('1',this.productDetail)
					await this.getAllArea()
					console.log(this.productDetail)					
					console.log('2',this.productDetail)
					// uni.setNavigationBarTitle({ title: `${this.productDetail.areaName + this.productDetail.location}` });
				})
				.catch(err => {
					this.loading = false;
					this.errorInfo = err;
				});
		}
	}
};
</script>
<style scoped lang="scss">
page {
	background: $page-color-base;
}
</style>
