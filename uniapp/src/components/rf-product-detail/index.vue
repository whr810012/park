<template>
	<view class="rf-product-detail">
		<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
		<view class="detail" v-if="product.stallId">
			<!--顶部商品轮播图-->
			<view class="carousel">
				<swiper indicator-dots circular="true" duration="400" controls touchable>
					<!--#endif-->
					<swiper-item class="swiper-item" v-for="(item, index) in product.url" :key="index">
						<view class="image-wrapper">
							<image :src="item" class="loaded" mode="aspectFill"></image>
						</view>
						<uni-tag class="content" circle size="small" :text="`${index + 1}  / ${product.url.length}`"></uni-tag>
					</swiper-item>
				</swiper>
			</view>
			<!--商品信息-->
			<view class="introduce-section">
				<view class="introduce-first-line">
					<view class="price-box">
						<view class="price-first-line">
							<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ product.price }}</text>
						</view>
						<view class="m-price-wrapper" v-if="product.market_price > product.price">
							价格 <text class="m-price">{{ moneySymbol }}{{ product.price }}</text>
						</view>
					</view>
				</view>
				<view class="introduce-second-line">
					<view class="title">
						<text>{{ product.areaName }}</text>
						<text class="sketch">{{ product.location }}</text>
					</view>
					<view class="share">
						<rf-tag type="gray" size="small" tui-tag-class="tui-tag-share tui-size" shape="circleLeft">
							<button class="share-btn" open-type="share" :class="'text-' + themeColor.name" @tap.stop="share()">
								<text class="iconfont iconfenxiang"></text>
								<text class="tui-share-text tui-gray">分享</text>
							</button>
						</rf-tag>
					</view>
				</view>
				<view class="data">
					<text class="item">状态：{{ product.status == 0 ? '空闲' : product.status == 1 ? '预定中' : '已占用' }}</text>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 200rpx; text-align: right;">开始停车时间：</view>
					<uni-datetime-picker returnType="timestamp" v-model="startDate" />
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center; padding-top: 20px;">
					<view style="width: 200rpx;text-align: right; ">离开时间：</view>
					<uni-datetime-picker returnType="timestamp" v-model="endDate" />
				</view>
				<view style="display: flex;align-items: center; padding-bottom: 20px;padding-top: 20px;">
					<view style="width: 200rpx;text-align: right; ">是否预定：</view>
					<switch :checked="status" @change="changeSwitch" />
				</view>
			</view>
			<!--商品参数-->
			<view class="c-list">
			</view>
			<!-- 评价 -->
			<view class="eva-section" @tap="toEvaluateList">
				<view class="e-header">
					<text class="tit">评价({{ evaluateList.length || 0 }})</text>
					<text class="tip" v-if="!evaluateList.length">暂无评价信息</text>
					<i class="iconfont iconyou"></i>
				</view>
				<view class="eva-box" v-if="evaluateList.length > 0">
					<view class="right">
						<view class="name">
							<text>
								{{ (evaluateList[0].userName) || '匿名用户' }}
							</text>
							<rf-rate v-if="evaluateList.length > 0" size="16" disabled="true" :value="evaluateList[0].score"
								:active-color="themeColor.color" />
						</view>
						<text class="con in2line">{{ (evaluateList[0].body) || '这个人很懒，什么都没留下~' }}</text>
						<view class="bot">
							<text class="time">{{ evaluateList[0].createTime }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部操作菜单 -->
			<view class="page-bottom">
				<view class="page-bottom-bth-wrapper">
					<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
						<i class="iconfont iconzhuyedefuben"></i>
						<text>首页</text>
					</navigator>
				</view>
				<view class="action-btn-group">
					<button class="action-btn" :class="'bg-' + themeColor.name" :disabled="buyBtnDisabled" @tap="buy()">
						立即购买
					</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import rfItemPopup from '@/components/rf-item-popup';
import rfAttrContent from '@/components/rf-attr-content';
import rfRate from '@/components/rf-rate/rf-rate';
import rfBadge from '@/components/rf-badge/rf-badge';
import uniTag from '@/components/uni-tag/uni-tag';
import rfNav from '@/components/rf-nav';
import rfLive from '@/components/rf-live';
import rfCalendar from '@/components/rf-calendar/rf-calendar';
import uniDatetimePicker from '@/components/uni-datetime-picker/uni-datetime-picker';
import { createOrder } from '@/api/request'
export default {
	name: 'rfProductDetail',
	props: {
		evaluateList: {
			type: Array,
			default() {
				return [];
			}
		},
		product: {
			type: Object,
			default() {
				return {
				};
			}
		},
		userInfo: {
			type: Object,
			default() {
				return {};
			}
		},
		url: {
			type: String,
			default: ''
		},
		marketType: {
			type: String,
			default: 'buy_now'
		}
	},
	components: {
		rfNav,
		rfCalendar,
		rfItemPopup,
		rfBadge,
		rfLive,
		rfRate,
		uniTag,
		rfAttrContent,
		uniDatetimePicker
	},
	data() {
		return {
			status: false,
			startDate: '',
			endDate: '',
			appServiceQr: this.$mSettingConfig.appServiceQr,
			kefuShow: false,
			addressClass: 'none',
			canvasShow: true,
			logo: this.$mSettingConfig.appLogo,
			vipPrice: this.$mAssetsPath.vipPrice,
			posterShow: false,
			serviceClass: 'none', // 服务弹窗
			ladderPreferentialClass: 'none', // 阶梯优惠弹窗
			attributeValueClass: 'none', // 商品参数弹窗
			specClass: 'none', // 商品参数弹窗
			couponClass: 'none', // 优惠券弹窗
			shareClass: 'none', // 分享引导弹窗
			fullGiveClass: 'none', // 满减送弹窗
			cartType: null, // 下单类型
			couponList: [], // 优惠券列表
			currentStock: null,
			currentSkuPrice: null,
			currentSkuName: null,
			currentCartCount: 1,
			hasLogin: this.$mStore.getters.hasLogin,
			cartNum: uni.getStorageSync('cartNum'),
			addressTypeList: this.$mConstDataConfig.addressTypeList,
			tabCurrentIndex: 0,
			loading: true,
			errorInfo: '',
			headImg: this.$mAssetsPath.headImg,
			isPointExchange: false,
			shareBg: this.$mAssetsPath.shareBg,
			appServiceType: this.$mSettingConfig.appServiceType,
			productPosterQrType: this.$mSettingConfig.productPosterQrType,
			appName: this.$mSettingConfig.appName,
			shareFrom: '',
			poster: {},
			promoCode: '',
			addressList: [],
			moneySymbol: this.moneySymbol,
			state: 1,
			singleSkuText: this.singleSkuText,
			thirdPartyQrCodeImg: ''
		};
	},
	methods: {
		changeSwitch (e) {
			console.log(e.target.value)
			this.status = e.target.value
		},
		// 监听日期变化
		bindDateChange() {

		},
		// 返回上一页
		navBack() {
			this.$mRouter.back();
		},
		hide() {
			this.kefuShow = false;
		},
		// 分享商品
		share() {
			// #ifdef H5
			if (this.$mPayment.isWechat()) {
				this.shareClass = 'show';
			} else {
				this.$mHelper.h5Copy(this.url);
			}
			// #endif
			// #ifdef APP-PLUS
			this.$mHelper.handleAppShare(this.url, this.appName, this.product.name, this.product.picture);
			// #endif
		},
		// 通用跳转
		// 通用跳转
		navTo(route, type) {
			if (this.appServiceType === '1' && route === '/pages/product/service/index') {
				this.kefuShow = true;
				return;
			}
			this.homeActive = true;
			if (type === 'tab') {
				this.$mRouter.switchTab({ route });
			} else {
				this.$mRouter.push({ route });
			}
		},
		// 跳转至评价列表
		toEvaluateList() {
			this.navTo('/pages/category/category', 'tab')
		},
		buy() {
			if (!this.startDate || !this.endDate) {
				this.$mHelper.toast('请选择日期')
				return
			}
			const nowDate = new Date()
			const now = nowDate.getTime()
			const start = new Date(this.startDate).getTime()
			const end = new Date(this.endDate).getTime()
			if (start < now) {
				this.$mHelper.toast('开始日期不能小于当前日期')
				return
			}
			if (end < now) {
				this.$mHelper.toast('结束日期不能小于当前日期')
			}
			if (end < start) {
				this.$mHelper.toast('结束日期不能小于开始日期')
				return
			}
			const time = end - start
			// 计算time是几个小时,不满一小时按照一小时算
			const hour = Math.ceil(time / (1000 * 60 * 60))
			const totalPrice = (this.product.price * hour).toFixed(2)
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
			const startTime = formatTimestamp(this.startDate)
			const endTime = formatTimestamp(this.endDate)
			const createTime = formatTimestamp(new Date().getTime())

			// 示例使用
			console.log(this.status)
			this.$http.post(createOrder, {
				areaid: this.product.areaid,
				createTime: createTime,
				startTime: startTime,
				endTime: endTime,
				openId: this.$store.state.openId,
				outTime: '',
				stallId: this.product.stallId,
				status: this.status ? 0 : 1,
				totalPrice: totalPrice
			}).then(() => {
				this.$mHelper.toast('下单成功')
				this.navBack()
			})
			console.log('product', this.product, this.startDate, this.endDate)
		},
	}
};
</script>
<style lang="scss">
.rf-product-detail {
	.back-btn {
		position: fixed;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			border-bottom: 1upx solid rgba(0, 0, 0, 0.01);

			image {
				width: 100%;
				height: 100%;
			}

			.content {
				position: absolute;
				right: $spacing-base;
				bottom: $spacing-base;
			}
		}
	}

	.detail {
		padding-bottom: 60upx;
	}

	.service {
		padding: $spacing-base $spacing-lg 0;

		.row {
			font-size: $font-lg;
			margin-bottom: $spacing-sm;
		}
	}

	.selected-text {
		margin-right: 4upx;
	}

	.sub-list {
		margin: 40upx 0 80upx;

		.row {
			width: 100%;
			margin-bottom: $spacing-lg;
		}
	}

	.share-bg {
		image {
			position: fixed;
			z-index: 100;
			width: 70vw;
			height: 45vw;
			right: $spacing-base;
			top: $spacing-base;
		}
	}

	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;

		.rf-list {
			max-height: 60vh;
			padding-bottom: 0;
			margin-bottom: $spacing-sm;
		}
	}

	// 拼团公告
	.rf-swiper-slide {
		margin-top: 20upx;

		.label {
			margin-left: 10upx;
		}
	}

	// 玩法介绍
	.play-way {
		background-color: $color-white;
		padding: 0 20upx;
		margin: 20upx 0;
		font-size: $font-base;

		.title {
			border-bottom: 1px solid #eee;
			padding: $spacing-base 0;
			display: flex;
			justify-content: space-between;

			.iconfont {
				margin-left: 0.13rem;
				font-size: 0.28rem;
				color: #717171;
			}
		}

		.way {
			font-size: $font-base - 2upx;
			padding: 20upx 0;
			display: flex;

			.item {
				flex: 1;
				text-align: center;

				.tip {
					font-size: 0.22rem;
					color: #a5a5a5;
				}
			}

			.arrow {
				width: 40upx;

				.iconfont {
					color: $font-color-light;
					font-weight: 100;
				}
			}
		}
	}

	.assemble {
		background-color: #fff;

		.assemble-item {
			height: 120upx;
			border-bottom: 1px solid #f0f0f0;

			.pictxt {
				display: flex;
				justify-content: space-between;

				.picture {
					display: flex;

					image {
						width: 80upx;
						height: 80upx;
						margin: 20upx 0;
						border-radius: 50%;
					}

					.text {
						line-height: 120upx;
						margin-left: 20upx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.time-wrapper {
						text-align: right;
						margin-right: 20upx;

						.lack {
							font-size: $font-sm;

							.font-color-red {
								margin: 0 4upx;
							}
						}

						.time {
							font-size: $font-sm;
							color: $font-color-light;
						}
					}

					.spellBnt {
						font-size: $font-sm;
						width: 120upx;
						height: 48upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 48upx;
					}
				}
			}
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;

			.buy-now {
				color: $uni-color-primary;
			}
		}

		.red {
			color: $uni-color-primary;
		}
	}

	.kefu-bg {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 98;

		image {
			width: 60vw;
			height: 60vw;
			border-radius: 12upx;
			z-index: 98;
		}
	}
}
</style>
