<template>
	<view class="order">
		<!--导航栏-->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="tabCurrentIndex === index ? `text-${themeColor.name} current` : ''" @tap="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<!--订单列表-->
		<swiper class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y v-if="orderList.length > 0">
					<view v-for="(item, index) in orderList" :key="index" class="rf-order-item">
						<view class="i-top b-b">
							<text class="time in1line">订单号：{{ item.orderid }}</text>
							<text class="time">{{ item.createTime }}</text>
							<text class="state" :class="'text-' + themeColor.name">{{ item.status | orderStatusFilter }}
							</text>
						</view>·
						<view class="goods-box-single">
							<image v-for="url in item.url" :key="url" class="goods-img" :src="url" style="margin-right: 10rpx;">
							</image>
						</view>
						<view class="price-box">
							实付款
							<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ item.totalPrice }}</text>
						</view>
						<view class="action-box b-t">
							<button class="action-btn" :class="'bg-' + themeColor.name" v-if="(item.status == 3 && !item.isEvaluate)"
								@tap="toEvaluate(item)">
								立即评价
							</button>
							<button class="action-btn" :class="'bg-' + themeColor.name" v-if="(item.status == 1 || item.status == 2 || item.status == 0)" @tap="pay(item)">
								立即支付
							</button>
							<view v-if="item.isEvaluate" style="color: #999999;">已评价</view>
						</view>
					</view>
				</scroll-view>
				<view v-else style="padding: 20rpx 0; text-align: center;">
					<rf-empty :list="guessYouLikeList" info="暂无订单"></rf-empty>
				</view>
			</swiper-item>
		</swiper>
		<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
			<view class="input-content">
				<view class="input-item">
					<text class="tit">订单</text>
					<input type="number" v-model="evaluateId" disabled />
				</view>
				<view class="input-item">
					<text class="tit">评价</text>
					<input type="number" v-model="evaluateText" placeholder="请输入评价" />
				</view>
				<view class="input-item">
					<text class="tit">评分</text>
					<input type="number" v-model="evaluateScore" placeholder="请输入评分（0 - 5）" />
				</view>
				<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
					@tap="evaluateOrder">
					确认评价
				</button>
			</view>
		</uni-popup>
	</view>
</template>
<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import moment from '@/common/moment';
import rfCountDown from '@/components/rf-count-down';
import mConstData from '@/config/constData.config';
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup';
import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog';
import { getMyOrder, getAllArea, getAllStall, finishOrder, evaluate, getAllEvaluate } from '@/api/request';
export default {
	components: {
		rfLoadMore,
		rfCountDown,
		uniPopup,
		uniPopupDialog
	},
	data() {
		return {
			evaluateId: '',
			evaluateText: '',
			evaluateScore: '',
			tabCurrentIndex: 0,
			loadingType: 'more',
			navList: this.$mConstDataConfig.orderNavList,
			moneySymbol: this.moneySymbol,
			orderList: [],
			page: 1,
			loading: true,
			isRefreshing: true,
			guessYouLikeList: [],
			singleSkuText: this.singleSkuText
		};
	},
	computed: {
		// 计算倒计时时间
		second() {
			return function (val) {
				return Math.floor(val - new Date() / 1000);
			};
		}
	},
	filters: {
		// 时间格式化
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
		// 状态显示格式化
		orderStatusFilter(orderStatus) {
			let state;
			mConstData.orderStatus.forEach(orderItem => {
				if (orderItem.key === parseInt(orderStatus, 10)) {
					state = orderItem.value;
				}
			});
			return state;
		}
	},
	onShow() {
		this.initData();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.orderList.length = 0;
		this.getOrderList('refresh');
	},
	// 加载更多
	onReachBottom() {
		if (this.loadingType === 'nomore' || this.orderList.length === 0) return;
		this.page++;
		this.getOrderList();
	},
	methods: {
		toEvaluate(item) {
			console.log('评价', item)
			this.evaluateId = item.orderid
			this.$refs.popup.open('top')
			// 弹窗输入评价和评分
		},
		evaluateOrder() {
			if (this.evaluateText === '' || this.evaluateScore === '') {
				this.$mHelper.toast('请输入评价和评分')
				return
			}
			if (this.evaluateScore < 0 || this.evaluateScore > 5) {
				this.$mHelper.toast('评分应在0-5之间')
				return
			}
			const formatTimestamp = (timestamp) => {
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
			}
			const time = formatTimestamp(new Date().getTime())
			this.$http.post(`${evaluate}`,{
				body: this.evaluateText,
				createTime: time,
				openId: this.$store.state.openId,
				orderId: this.evaluateId,
				score: this.evaluateScore
			}).then(() =>{
				this.$mHelper.toast('评价成功')
				this.$refs.popup.close()
				this.initData()
				this.evaluateId = ''
				this.evaluateText = ''
				this.evaluateScore = ''
			})
		},
		pay(item) {
			console.log('支付', item);
			const formatTimestamp = (timestamp) => {
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
			}
			const time = formatTimestamp(new Date().getTime())
			this.$http.post(`${finishOrder}`, {
				stallId: item.stallId,
				orderid: item.orderid,
				status: 3,
				outTime: time
			}).then(() => {
				this.$mHelper.toast('已支付')
				this.initData()
			})
		},
		// 数据初始化
		async initData() {
			this.openId = uni.getStorageSync('openId');
			await this.getOrderList();
		},
		// 获取订单列表
		getOrderList() {
			this.loading = true
			this.$http.get(`${getMyOrder}`).then(res => {
				this.orderList = res
				this.orderList = this.orderList.filter(item => item.openId === this.openId)
				this.$http.get(`${getAllStall}`).then(res1 => {
					this.stallList = Object.values(res1.reduce((acc, item) => {
						// 如果该stallId已经存在，则合并url
						if (!acc[item.stallId]) {
							acc[item.stallId] = { ...item, url: [item.url] }
						} else {
							acc[item.stallId].url.push(item.url)
						}
						return acc
					}, {}))
					this.$http.get(`${getAllArea}`).then(res2 => {
						this.areaList = res2
						this.orderList.forEach(item => {
							this.stallList.map(stall => {
								if (stall.stallId == item.stallId) {
									item.location = stall.location
									item.url = stall.url
								}
							})
							this.areaList.map(area => {
								if (area.areaid == item.areaid) {
									item.areaName = area.areaName
								}
							})
						})
						this.$http.get(`${getAllEvaluate}`).then(res3 => {
						  this.evaluateList = res3
							this.orderList.forEach(item => {
								item.isEvaluate = false
							  this.evaluateList.map(evaluate => {
							    if(item.orderid == evaluate.orderId){
										item.isEvaluate = true
									} 
							  })
							})
							this.loading = false
						})

						console.log('当前情况', this.tabCurrentIndex);
						this.orderList = this.orderList.filter(item => {
							if (this.tabCurrentIndex == 0) { return item }
							if (this.tabCurrentIndex == 1) { return item.status == 0 }
							if (this.tabCurrentIndex == 2) { return item.status == 1 }
							if (this.tabCurrentIndex == 3) { return item.status == 2 }
							if (this.tabCurrentIndex == 4) { return item.status == 3 }
						})
						// 0：全部 1：待付款 2：待发货 
					})
				})
			})
		},
		// 监听swiper切换
		changeTab(e) {
			this.page = 1;
			this.orderList.length = 0;
			this.tabCurrentIndex = e.target.current;
			this.loading = true;
			this.getOrderList();
		},
		// 顶部tab点击
		tabClick(index) {
			this.page = 1;
			this.orderList.length = 0;
			this.tabCurrentIndex = index;
			this.loading = true;
			this.getOrderList();
		},
		// 顶部tab点击
		getMoreOrderList() {
			if (this.loadingType === 'nomore' || this.orderList.length === 0) return;
			this.page++;
			this.getOrderList();
		}
	}
};
</script>
<style lang="scss">
page,
.order {
	background: $page-color-base;
	height: 100%;

	.order-search {
		padding: $spacing-sm $spacing-base;
		position: relative;

		.order-search-input {
			width: 100%;
			background-color: $color-white;
			border-radius: 40upx;
			padding: $spacing-sm 0 $spacing-sm $spacing-lg;
			color: $font-color-light;
		}

		.iconfont {
			position: absolute;
			right: 48upx;
			top: 22upx;
		}
	}

	.swiper-box {
		height: calc(100% - 160upx);
	}

	.list-scroll-content {
		height: 100%;
	}

	.uni-swiper-item {
		height: auto;
	}

	.input-content {
		margin-top: 16upx;
		padding: 40upx 60upx;
		background-color: #fff;

		.input-item {
			display: flex;
			padding: 0 30upx;
			background: $page-color-light;
			height: 80upx;
			line-height: 80upx;
			border-radius: 4px;
			margin-bottom: 30upx;

			&:last-child {
				margin-bottom: 0;
			}

			.tit {
				width: 100upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
			}

			input {
				width: calc(100% - 100upx);
				height: 80upx;
				line-height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}

			.date {
				height: 80upx;
				line-height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}

			.gender-item {
				margin-right: 20upx;

				.gender-item-text {
					padding-left: 10upx;
				}

				radio .wx-radio-input.wx-radio-input-checked {
					background: $uni-color-primary;
					border-color: $uni-color-primary;
				}
			}
		}
	}
}
</style>
