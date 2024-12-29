<template>
	<view class="rf-index">
		<!--搜索导航栏-->
		<rf-search-bar @search="navToSearch" title="扫一扫" @tab="tabClick" :categoryList="categoryList"
			:merchantData="merchantData" :placeholder="hotSearchDefault" />
		<view :style="{
			paddingTop: merchantShow ? (isOpenIndexCate ? 134 + statusBar + 'px' : 85 + statusBar + 'px') : (isOpenIndexCate ? 98 + statusBar + 'px' : 55 + statusBar + 'px')
		}">
			<block v-if="currentCate === 0">
				<!-- 轮播图 -->
				<view class="swiper">
					<view class="swiper-box">
						<rf-swipe-dot :info="swipeList" mode="nav" :current="current" field="title">
							<swiper @change="handleDotChange" autoplay="true">
								<swiper-item v-for="(item, index) in swipeList" :key="index">
									<view class="swiper-item">
										<image :src="item.cover" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
						</rf-swipe-dot>
					</view>
				</view>
				<!-- 新闻通知 -->
				<rf-swiper-slide v-if="noticeList.length > 0" :list="noticeList" class="rf-skeleton">
					<view slot="header" class="swiper-slide-header">
						<text class="iconfont icongonggao" :class="'text-' + themeColor.name"></text>
					</view>
				</rf-swiper-slide>
				<!--推荐商品-->
				<rf-floor-index icon="icontuijian21" :list="stallList"
					:header="{ title: '推荐车位', desc: 'Recommended parking space' }" @toList="
			navTo(
				`/pages/product/list`
			)
			" @detail="navToDetailPage" :banner="carouselList.index_recommend && carouselList.index_recommend[0]" />
				<!--评价预览-->
				<!--@toBanner="indexTopToDetailPage" -->
				<rf-index-evaluate icon="iconxinpin2" :list="evaluateList"
					:header="{ title: '评价预览', desc: 'Evaluation preview' }" 
					@toList="navTo('/pages/category/category', 'tab')" 
					:banner="carouselList.index_recommend && carouselList.index_recommend[0]" />
			</block>
			<view v-else class="index-cate-product-list">
				<rf-product-list :bottom="bottom" :list="categoryProductList"></rf-product-list>
				<rf-empty :bottom="bottom" :info="'该区域暂无车位~'"
					v-if="categoryProductList.length === 0 && !productLoading"></rf-empty>
			</view>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
		<rfLoading isFullScreen :active="!isLogin" :text="'正在登录,请稍后...'"></rfLoading>
		<rf-back-top :scrollTop="scrollTop" @setScrollTop="setScrollTop"></rf-back-top>
		<rf-back-home></rf-back-home>
	</view>
</template>
<script>
import {
	getAllStall,
	getAllArea,
	getAllNotice,
	getAllEvaluate,
	getAllMember
} from '@/api/request';
import rfSwipeDot from '@/components/rf-swipe-dot';
import rfFloorIndex from '@/components/rf-floor-index';
import rfIndexEvaluate from '@/components/rf-index-evaluate';
import rfSearchBar from '@/components/rf-search-bar';
import rfSwiperSlide from '@/components/rf-swiper-slide';
import rfProductList from '@/components/rf-product-list';
import listCell from '@/components/rf-list-cell';
export default {
	components: {
		rfFloorIndex,
		rfSwipeDot,
		rfProductList,
		rfSearchBar,
		listCell,
		rfSwiperSlide,
		rfIndexEvaluate
	},
	data() {
		return {
			swipeList: [
				{
					cover: 'https://ts1.cn.mm.bing.net/th/id/R-C.0e0fe5dac3e9d131aaa468e73d685fe9?rik=iJkOfeeIWRUHeA&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50075%2f0200.jpg_wh1200.jpg&ehk=pxDGcgbHhR4turumNkUWpZKWysxR0LqjCNzF65Yq3wE%3d&risl=&pid=ImgRaw&r=0'
					, title: '停车场实情'
				},
				{
					cover: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.8aTyKwt9wwZbZd4rC1gqSwHaE7?w=860&h=573&rs=1&pid=ImgDetMain'
					, title: '停车场实情'
				}
			],
			current: 0, // 轮播图index
			areaList: [],
			stallList: [],
			noticeList: [],
			evaluateList: [],


			share: {},
			loading: false,
			scrollTop: 0,
			kefuShow: true,
			loadingType: 'more',
			hotSearchDefault: '请输入关键字',
			appName: this.$mSettingConfig.appName,
			categoryList: [], // 分类列表
			categoryProductList: [], // 分类列表
			page: 1,
			currentCate: 0,
			hotRecommendList: this.$mConstDataConfig.hotRecommendList,
			productLoading: true,
			isOpenIndexCate: this.$mSettingConfig.isOpenIndexCate,
			moneySymbol: this.moneySymbol,
			merchantShow: false,
			merchantData: {}
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onShow() {
		this.initData();
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
		statusBar() {
			const e = uni.getSystemInfoSync();
			return e.statusBarHeight;
		},
		// 计算倒计时时间
		bottom() {
			let bottom = 0;
			/*  #ifdef H5  */
			bottom = 90;
			/*  #endif */
			return bottom;
		}
	},
	onShareAppMessage() {
		let shareParams = { title: this.share.share_title || `欢迎来到${this.appName}`, path: '/pages/index/index' };
		return shareParams;
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.getIndexList('refresh');
	},
	// 加载更多
	onReachBottom() {
		if (this.currentCate === 0) return;
		if (this.loadingType === 'nomore') return;
		this.page++;
		this.getAllStall(this.currentCate);
	},
	methods: {
		// 顶部tab点击
		async tabClick({ id }) {
			console.log(id);
			this.currentCate = id;
			if (id === 0) return;
			this.loading = true;
			this.productLoading = true;
			this.categoryProductList = []
			await this.$http
				.get(`${getAllStall}`)
				.then(async r => {
					this.loading = false;
					this.productLoading = false;
					this.categoryProductList = Object.values(r.reduce((acc, item) => {
            // 如果该stallId已经存在，则合并url
            if (!acc[item.stallId]) {
                acc[item.stallId] = { ...item, url: [item.url] }
            } else {
                acc[item.stallId].url.push(item.url)
            }
            return acc
        }, {}))
					this.areaList.map(area =>{
						this.categoryProductList.forEach(stall => {
							if (stall.areaid == area.areaid) {
								stall.areaName = area.areaName
							}
						})
					})
					this.categoryProductList = this.categoryProductList.filter(item => item.areaid == id)
					this.categoryProductList = this.categoryProductList.filter(item => item.status === 0)
				}).catch(() => {
					this.loading = false;
					this.productLoading = false;
				});
		},
		// 获取产品列表
		async getAllStall(id) {
			await this.$http
				.get(`${getAllStall}`)
				.then(async r => {
					this.loading = false;
					this.productLoading = false;
					this.stallList = Object.values(r.reduce((acc, item) => {
            // 如果该stallId已经存在，则合并url
            if (!acc[item.stallId]) {
                acc[item.stallId] = { ...item, url: [item.url] }
            } else {
                acc[item.stallId].url.push(item.url)
            }
            return acc
        }, {}))
					this.areaList.map(area =>{
						this.stallList.forEach(stall => {
							if (stall.areaid == area.areaid) {
								stall.areaName = area.areaName
							}
						})
					})
					this.stallList = this.stallList.filter(item => item.status === 0)
					this.stallList = this.stallList.slice(0, 6)
				}).catch(() => {
					this.loading = false;
					this.productLoading = false;
				});
		},
		async getAllNotice() {
			await this.$http
				.get(`${getAllNotice}`)
				.then(async r => {
					this.noticeList = r
				})
		},
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
							this.evaluateList = this.evaluateList.slice(0, 6)
						})
						console.log(this.evaluateList);
					})
				})
		},
		// 监听轮播图切换
		handleDotChange(e) {
			this.current = e.detail.current;
		},
		// 数据初始化
		initData() {
			// 设置购物车数量角标
			this.getIndexList();
			this.getAllStall()
			this.getAllNotice()
			this.getAllEvaluate()
		},
		// 通用跳转
		navTo(route, type) {
				this.homeActive = true;
				if (type === 'tab') {
					this.$mRouter.switchTab({ route });
				} else {
					this.$mRouter.push({ route });
				}
			},
		// 跳转至分类模块
		navToCategory(id) {
			if (this.$mSettingConfig.appCateType === '2') {
				uni.setStorageSync('indexToCateId', id);
				this.$mRouter.reLaunch({ route: '/pages/category/category' });
			} else {
				this.navTo(`/pages/product/list?cate_id=${id}`);
			}
		},
		// 通用跳转
		navToSearch() {
			this.$mRouter.push({
				route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`
			});
		},
		// 跳至广告图指定页面
		indexTopToDetailPage(item) {
			this.$mHelper.handleBannerNavTo(item.jump_type, item.jump_link, item.id);
		},
		// 获取主页数据
		async getIndexList(type) {
			await this.$http
				.get(`${getAllArea}`, {})
				.then(async r => {
					this.areaList = r
					this.areaList.forEach(item => {
						item.title = item.areaName
						item.id = item.areaid
					})
					this.categoryList = [{ id: 0, title: '首页' }, ...this.areaList];
					// 首页参数赋值
					this.loading = false;
				})
				.catch((err) => {
					console.log('2222', err);
					this.loading = false;
				});
		},
		// 跳转至商品详情页
		navToDetailPage(data) {
			const { id } = data;
			console.log('123123',id);
			if (!id) return;
			this.$mRouter.push({ route: `/pages/product/product?id=${id}` });
		},
		// 跳转至分类页
		toCategory() {
			this.$mRouter.switchTab({ route: '/pages/category/category' });
		},
		//滑动到顶部
		setScrollTop () {
			console.log(123);
		//滑动到顶部	// 
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300
		});
		} 
	}
};
</script>
<style lang="scss">
page {
	background-color: $page-color-base;
}

.rf-index {
	background-color: $color-white;

	/*爆款拼团*/
	.wrapper {
		border-radius: 10upx;

		.h-list {
			background-color: $page-color-base;
			white-space: nowrap;
			padding: 0 $spacing-sm;

			.h-item {
				margin: $spacing-sm $spacing-sm $spacing-sm 0;
				display: inline-block;
				background-color: $color-white;
				font-size: $font-sm;
				width: 280upx;
				border-radius: 6upx;

				.h-item-img {
					display: inline-block;
					width: 280upx;
					height: 300upx;
					border-top-left-radius: 12upx;
					border-top-right-radius: 12upx;
					border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
				}

				.title {
					width: 280upx;
					white-space: normal;
					height: 60upx;
					line-height: 30upx;
					font-size: $font-sm;
					padding: 0 $spacing-sm;
					margin: $spacing-sm 0;
				}

				.last-line {
					padding: 0 $spacing-sm $spacing-base;
					margin-bottom: 5upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					/* 垂直居中 */
					.red {
						font-size: $font-sm;
						margin-right: 4upx;
					}
				}

				.price {
					font-size: $font-base - 2upx;
					line-height: 1;

					.m-price {
						margin-left: 8upx;
						color: $font-color-light;
						font-size: $font-sm;
						text-decoration: line-through;
					}
				}
			}
		}
	}

	/*轮播图*/
	.swiper {
		width: 100%;
		margin-bottom: 20upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 40vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}
		}
	}

	/* 爆款推荐 */
	.hot-recommend {
		background-color: $color-white;
		display: flex;
		padding: $spacing-base $spacing-lg 0;

		.hot-recommend-image {
			width: 100%;
			height: 100%;
		}

		.left {
			flex: 3;
			height: 350upx;
			margin-right: 15upx;
		}

		.right {
			flex: 4;

			.hot-recommend-image {
				height: 170upx;
			}
		}
	}

	/*轮播图2*/
	.swiper-item-text {
		position: absolute;
		bottom: 16upx;
		left: 30upx;
		height: 48upx;
		line-height: 48upx;
		background: rgba(0, 0, 0, 0.2);
		width: 90%;
		color: $color-white;
		border-bottom-left-radius: 12upx;
		padding-left: 20upx;
	}

	/*新闻通知*/
	.swiper-slide-header {
		.iconfont {
			font-size: $font-lg + 8upx;
			font-weight: 600;
		}
	}

	/*分类列表*/
	.category-list-wrapper {
		.category-list {
			width: 100%;
			padding: $spacing-base;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.category {
				margin-top: 10upx;
				width: calc(20% - 20upx);
				height: 132upx;
				display: flex;
				text-align: center;
				flex-wrap: wrap;

				.img {
					width: 100%;
					display: flex;
					justify-content: center;

					image {
						width: 12vw;
						height: 12vw;
						border-radius: 50%;
					}
				}

				.text {
					margin-top: 16upx;
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 24upx;
					color: #3c3c3c;
				}
			}
		}
	}

	/*版权显示*/
	.copyright {
		margin: 10upx 0;
		width: 100%;
		text-align: center;
		color: #666;

		a {
			display: block;
			color: #666;
			text-decoration: none;
		}
	}

	/*限时抢购*/
	.order-item {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 0 30upx;
		margin-bottom: 20upx;

		.goods-box-single {
			display: flex;
			padding: 40upx 10upx 10upx;
			height: 330upx;
			border-radius: 12upx;
			margin-top: 20upx;
			box-shadow: 2px 2px 10px rgba(66, 135, 193, 0.2); // 阴影
			border-bottom: 1px solid rgba(0, 0, 0, 0.05); // 边框
			position: relative;

			.goods-img {
				display: block;
				border-radius: 12upx;
				width: 190upx;
				height: 200upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-weight: bold;
					line-height: 1.2;
					margin: 10upx 0;
				}

				.attr-box {
					line-height: 1.2;
					margin-bottom: 8upx;
					margin-left: 10upx;
				}

				.last-line {
					margin-top: 3upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					/* 垂直居中 */
					.red {
						margin-right: 4upx;
					}
				}

				.price {
					font-size: $font-lg;
					line-height: 1;

					.m-price {
						margin-left: 8upx;
						color: $font-color-light;
						font-size: $font-sm;
						text-decoration: line-through;
					}
				}

				.triangle-wrapper {
					position: absolute;
					overflow: hidden;
					top: 0;
					right: 0;
					border-radius: 12upx;

					.triangle {
						color: #5eba8f;
						width: 0;
						height: 0;
						border-top: 120upx solid;
						opacity: 0.8;
						border-left: 120upx solid transparent;
					}

					.triangle-content {
						position: absolute;
						top: 28upx;
						right: 0;
						transform: rotate(45deg);
						font-size: $font-sm - 2upx;
						color: #fff;
					}
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 90upx;
			position: relative;

			.discount-time {
				font-size: $font-sm;
				color: $uni-color-success;
				margin-right: 20upx;
			}
		}
	}

	.index-cate-product-list {
		padding-top: $spacing-sm;
		background-color: $page-color-base;

		.no-data {
			margin: 48upx 0;
			color: $font-color-light;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconfont {
				margin-right: 20upx;
				font-size: $font-lg + 16upx;
			}
		}
	}
}
</style>
