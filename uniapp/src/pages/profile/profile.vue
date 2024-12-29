<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view class="portrait-box">
					<button class="portrait" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image style="width: 100%;height: 100%;" :src="userUrl"></image>
					</button>
					<text class="username" @click="addInfo">
						{{	userInfo.userName ||	'微信用户'}}
					</text>
				</view>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view class="cover-container" :style="[{	transform: coverTransform,	transition: coverTransition}]" >
			<image class="arc" :src="arc"></image>
			<!-- 我的订单 -->
			<view class="promotion-center">
				<list-cell icon="iconicon1" :iconColor="themeColor.color" @eventClick="
			navTo(`/pages/order/order?state=-1`)
			" title="全部订单"></list-cell>
			</view>
			<!--我的服务-->
			<view class="promotion-center">
				<list-cell icon="iconfuwu" :iconColor="themeColor.color" :title="_i18n.t('profile.myService')"></list-cell>
				<view class="tj-sction">
					<!-- 分类列表 -->
					<view class="category-list">
						<view class="category" v-for="(item, index) in settingList" :key="index"
							:style="{ display: settingItemShowFilter(item.title) }" @tap.stop="navTo(item.$orig.url)">
							<view v-if="item.title !== '分享'">
								<view class="img">
									<text class="iconfont" :class="[item.icon, 'text-' + themeColor.name]"></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</view>
							<button class="share-btn" open-type="share" @tap="share" v-else>
								<view class="img">
									<text class="iconfont" :class="[item.icon, 'text-' + themeColor.name]"></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</button>
						</view>
						<view class="category" @tap="switchLanguage">
							<view class="img">
								<text class="iconfont iconyuyanqiehuan" :class="['text-' + themeColor.name]"></text>
							</view>
							<view class="text">{{ currentLanguage }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="!isLogin" :text="'正在登录,请稍后...'"></rfLoading>
	</view>
</template>
<script>
import listCell from '@/components/rf-list-cell';
import { mapMutations } from 'vuex';
import rfBadge from '@/components/rf-badge/rf-badge';
import $mAssetsPath from '@/config/assets.config';
let startY = 0, moveY = 0, pageAtTop = true;
export default {
	components: {
		listCell,
		rfBadge
	},
	data() {
		return {
			userUrl: '',
			orderSectionList: this.$mConstDataConfig.orderSectionList,
			amountList: this.$mConstDataConfig.amountList,
			isOpenLiveStreaming: this.$mSettingConfig.isOpenLiveStreaming,
			headImg: this.$mAssetsPath.headImg,
			vipCardBg: this.$mAssetsPath.vipCardBg,
			arc: this.$mAssetsPath.arc,
			userBg: this.$mAssetsPath.userBg,
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			userInfo: {
				// 用户信息
				promoter: null // 分销商信息
			},
			footPrintList: [], // 足迹列表
			loading: true,
			appName: this.$mSettingConfig.appName,
			hasLogin: false,
			currentLanguage: this._i18n.locale === 'zh' ? 'English' : '中文'
		};
	},
	filters: {
		filterMemberLevel(val) {
			if (!val) return '普通用户';
			return val.name;
		},
		marketingTypeTag(marketingType) {
			let tag;
			switch (marketingType) {
				case 'discount':
					tag = $mAssetsPath.discountTag;
					break;
				case 'bargain':
					tag = $mAssetsPath.bargainTag;
					break;
				case 'group_buy':
					tag = $mAssetsPath.groupTag;
					break;
				case 'wholesale':
					tag = $mAssetsPath.wholesaleTag;
					break;
			}
			return tag;
		}
	},
	computed: {
		isLogin() {
			const openid = this.$store.state.openId
			const myInfo = this.$store.state.myInfo
			if (openid && myInfo) {
				return true;
			}
			return false;
		},
		// 判断推广中心是否显示 当有分销商信息的时候显示
		settingItemShowFilter() {
			return function (val) {
				let type = 'block';
				if (val === '推广中心' && this.userInfo.promoter) {
					type = 'none';
				} else if (val === '直播' && !this.isOpenLiveStreaming) {
					type = 'none';
				}
				return type;
			};
		},
		settingList() {
			return [
				{ icon: 'icongonggao', url: '/pages/notify/notify', title: this._i18n.t('profile.notice'), color: '#ff6b81' },
				{ icon: 'iconfenxiang', url: '', title: this._i18n.t('profile.share'), color: '#ff6b81' },
			];
		}
	},
	// 小程序分享
	onShareAppMessage() {
		return {
			title: `欢迎来到${this.appName}`,
			path: '/pages/index/index'
		};
	},
	async onShow() {
		this.userInfo = uni.getStorageSync('myInfo')
		this.userUrl = uni.getStorageSync("userimg")
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/set/set');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			// eslint-disable-next-line
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			this.$mRouter.switchTab({ route: '/pages/notify/notify' });
		}
	},
	// #endif
	methods: {
		// 打开个人中心设置页面
		addInfo () {
			this.$mRouter.push({ route: '/pages/user/userinfo/userinfo' });
		},
		//获取头像
		onChooseAvatar(e) {
			this.userInfo.url = e.detail.avatarUrl;
			console.log(e);
			uni.setStorageSync("userimg", e.detail.avatarUrl);
			this.userUrl = e.detail.avatarUrl;
		},
		// 切换语言
		switchLanguage() {
			if (this._i18n.locale === 'zh') {
				this._i18n.locale = 'en';
				this.currentLanguage = '中文';
			} else if (this._i18n.locale === 'en') {
				this._i18n.locale = 'zh';
				this.currentLanguage = 'English';
			}
			this.$mStore.commit('setLocale', this._i18n.locale);
			uni.setNavigationBarTitle({ title: this._i18n.t('menu.my') });
			uni.setTabBarItem({ index: 0, text: this._i18n.t('menu.index') });
			uni.setTabBarItem({ index: 1, text: this._i18n.t('menu.category') });
			uni.setTabBarItem({ index: 2, text: this._i18n.t('menu.notify') });
			uni.setTabBarItem({ index: 3, text: this._i18n.t('menu.cart') });
			uni.setTabBarItem({ index: 4, text: this._i18n.t('menu.my') });
		},
		...mapMutations(['setNotifyNum', 'setCartNum']),
		// 分享
		share() {
			const url = `${this.$mConfig.hostUrl}/pages/index/index`;
			// #ifdef H5
			this.$mHelper.h5Copy(url);
			// #endif
			// #ifdef APP-PLUS
			const shareImg = `${this.$mSettingConfig.appLogo}`;
			this.$mHelper.handleAppShare(url, this.appName, `欢迎来到${this.appName}`, shareImg);
			// #endif
		},
		// 统一跳转接口,拦截未登录路由
		navTo(route) {
			console.log('asd', route)
			if (route === '/pages/notify/notify') {
				this.$mRouter.switchTab({ route });
			}
				this.$mRouter.push({ route });
		}
	}
};
</script>
<style lang="scss" scoped>
page {
	background-color: $page-color-base;
}

.user {
	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 60vw;
			opacity: 0.84;
		}

		.user-info-box {
			height: 180upx;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;
			justify-content: space-between;

			.portrait-box {
				display: flex;
				align-items: center;

				.portrait {
					width: 130rpx;
					height: 130rpx;
					padding: 0px !important;
					border: 1px solid #fff;
				}

				.username {
					font-size: $font-lg + 6upx;
					color: $color-white;
					margin-left: 20upx;
				}

				button {
					background-color: transparent;
					font-size: $font-lg + 6upx;
					color: $font-color-dark;
					border: none;
				}

				button::after {
					border: none;
				}
			}
		}

		.vip-card-box {
			display: flex;
			flex-direction: column;
			color: #f7d680;
			height: 240upx;
			background: url('/static/vip-card.png');
			background-size: 100% 100%;
			border-radius: 16upx 16upx 0 0;
			overflow: hidden;
			position: relative;
			padding: 20upx 24upx;

			.b-btn {
				position: absolute;
				right: 24upx;
				top: 24upx;
				width: 132upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #36343c;
				border-radius: 20px;
				background: linear-gradient(to left, #f9e6af, #ffd465);
				z-index: 1;
			}

			.tit {
				font-size: $font-base + 2upx;
				color: #f7d680;
				margin-bottom: 28upx;

				.iconfont {
					color: #f6e5a3;
					display: inline-block;
					margin-right: 16upx;
				}
			}
		}
	}

	.cover-container {
		margin-top: -150upx;
		padding: 0 30upx 20upx;
		position: relative;
		background-color: $page-color-base;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}

		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}

					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.tj-sction {
			@extend %section;
			display: flex;

			.tj-item {
				@extend %flex-center;
				flex: 1;
				flex-direction: column;
				margin: 30upx 0;
				font-size: $font-sm;
				color: #75787d;
				/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
			}

			/*.tj-item:last-child {*/
			/*border-right: none;*/
			/*}*/
			.num {
				font-size: $font-base;
			}

			.red {
				color: $base-color;
			}
		}

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.history-section {
			background: #fff;
			margin-bottom: $spacing-sm;

			.h-list-history {
				margin: 0;
				border-radius: 10upx;
				white-space: nowrap;
				background-color: $page-color-base;

				.h-item-history {
					background-color: $color-white;
					display: inline-block;
					font-size: $font-sm;
					color: $font-color-base;
					width: 180upx;
					margin: $spacing-sm $spacing-sm 0 0;
					border-radius: 10upx;
					position: relative;
					top: 0;
					overflow: hidden;

					.h-item-img {
						width: 180%;
						height: 200upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
						border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
					}

					.tag {
						position: absolute;
						border-top-left-radius: 12upx;
						left: 0;
						right: 0;
						width: 60upx;
						height: 60upx;
					}

					.h-item-text {
						font-size: $font-sm;
						margin: $spacing-sm 4upx;
					}
				}
			}

			.no-foot-print {
				text-align: center;
				padding: 48upx 0;

				.no-foot-print-icon {
					font-size: $font-lg + 2upx;
					margin-right: 10upx;
				}
			}

			.share-btn {
				height: 102upx;
				text-align: left;
				background: none;
				padding: 0;
				margin: 0;
			}

			.share-btn:after {
				border: none;
				border-radius: none;
			}
		}
	}
}

%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

%section {
	justify-content: space-around;
	display: flex;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
</style>
