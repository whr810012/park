<template>
	<view class="rf-category">
		<view class="category-list"
			v-if="(styleCateType === 'one_two_three_cover' || styleCateType === 'one_two_three_text') && categoryList.length > 0">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(fItem, fIndex) in categoryList" :key="fItem.id"
					:class="[fIndex === showCategoryIndex ? 'on' : '']" @tap="showCategory(fIndex)">
					<view class="text">
						<view class="block" :class="'bg-' + themeColor.name"></view>
						{{ fItem.areaName }}
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right">
				<block v-for="(item, index) in filterCommentList" :key="index">
					<view class="rf-product-item" :class="[isList ? 'rf-product-flex-list' : '']" hover-class="hover"
						:hover-start-time="150" style="border-bottom: 1px solid #eee;">
						<view style="padding:5vw">
							<view>点评人：{{ item.userName }}</view>
							<view>内容：{{ item.body }}</view>
							<view>评分：{{ item.score }}</view>
							<view>时间：{{ item.createTime }}</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</scroll-view>
		</view>
		<rf-empty :bottom="bottom" :info="'暂无评论~'" v-if="filterCommentList.length === 0 && !loading"></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
		<rfLoading isFullScreen :active="!isLogin" :text="'正在登录,请稍后...'"></rfLoading>
		<!-- 规格-模态层弹窗 -->
	</view>
</template>
<script>
import rfSearchBar from '@/components/rf-search-bar';
import rfAttrContent from '@/components/rf-attr-content';
import { getAllArea, getAllEvaluate, getAllMember } from '@/api/request';
export default {
	components: {
		rfSearchBar,
		rfAttrContent
	},
	data() {
		return {
			evaluateList: [],
			categoryList: [], // 分类列表
			currentAreaId: '',//当前areaid
			showCategoryIndex: 0, // 一级菜单高亮显示序号
			loading: true,
			styleCateType: this.$mSettingConfig.styleCateType,
		};
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
		bottom() {
			let bottom = 0;
			/*  #ifdef H5  */
			bottom = 90;
			/*  #endif */
			return bottom;
		},
		filterCommentList() {
			console.log(this.currentAreaId);
			return this.evaluateList.filter(item => {
				if (this.currentAreaId == '') {
					return true
				} else {
					return item.areaid == this.currentAreaId
				}
			})
		}
	},
	// 每次页面显示 执行该方法
	onShow() {
		if (!this.isLogin) {
			return
		}
		this.initData();
	},
	methods: {
		// 跳转至商品列表
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 数据初始化
		async initData() {
			this.categoryList = [];
			await this.getAllArea();
			await this.getAllEvaluate();
		},
		// 获取区域
		async getAllArea() {
			await this.$http
				.get(`${getAllArea}`)
				.then(async r => {
					this.categoryList = [{ areaName: '全部', areaId: '' }, ...r]
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
		// 获取所有评价
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
		// 显示第几个分类
		showCategory(index) {
			this.showCategoryIndex = index;
			this.currentAreaId = this.categoryList[index].areaid || '';
			console.log(this.currentAreaId);
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: $color-white;
}

.rf-category {
	background-color: $color-white;
	/*  #ifdef  APP-PLUS  */
	margin-top: calc(20upx + var(--status-bar-height));

	/*  #endif  */
	/*模块分类*/
	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			position: absolute;
			top: 0upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(80upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: $page-color-base;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 6upx;
							height: 120%;
							left: 10upx;
						}
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;
			background-color: #fff;

			.second-category {
				z-index: 10;
				white-space: nowrap;
				width: 100%;
				margin: $spacing-sm $spacing-sm $spacing-base;

				.second-category-tag {
					margin-right: $spacing-base;
					padding: 5upx $spacing-lg;
					display: inline-block;
					border-radius: 8upx;
					font-size: $font-sm + 2upx;
				}

				.second-category-normal {
					color: $font-color-dark;
					border: none;
					background-color: $page-color-light;
				}
			}

			.category {
				width: 100%;
				padding: 0 15upx $spacing-base;

				.banner {
					width: 96%;
					margin: 10upx auto 30upx;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.05);

					image {
						width: 100%;
						height: 24.262vw;
					}
				}

				.order-by-wrapper {
					height: 48upx;
					line-height: 48upx;
					display: flex;
					justify-content: space-between;
					margin: $spacing-sm 0;
					font-size: $font-sm + 2upx;

					.order-by {
						display: flex;
						justify-content: center;
						align-items: center;

						.order-by-item {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: $font-sm + 2upx;
							margin: 0 $spacing-base 0 $spacing-sm;
							color: $font-color-light;

							.iconfont-group {
								margin-top: -2upx;
							}

							.iconfont {
								height: 16upx;
								line-height: 16upx;
								display: block;
								margin-left: 6upx;
								font-weight: 550;
								font-size: $font-sm - 4upx;
							}
						}
					}
				}

				.list {
					margin-top: $spacing-base;
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.box {
						width: calc(71.44vw / 3);
						margin-bottom: $spacing-lg;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						image {
							width: 64%;
							height: calc(71.44vw / 3 * 0.64);
						}

						.text {
							margin-top: 8upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}

						.category-tag {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							padding: $spacing-sm;
							font-size: $font-sm + 2upx;
							margin-right: $spacing-base;
							color: $font-color-dark;
							background-color: $page-color-base;
							border-radius: 6upx;
						}
					}
				}

				.second-category-text {
					display: flex;
					justify-content: space-between;
				}

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
	}

	.one-cover-category {
		margin-top: $spacing-base;
		width: 100%;
		display: flex;
		flex-wrap: wrap;

		.box {
			width: calc(71.44vw / 3);
			margin-bottom: $spacing-lg;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;

			image {
				width: 64%;
				height: calc(71.44vw / 3 * 0.64);
			}

			.text {
				margin-top: 8upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 26upx;
			}

			.category-tag {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: $spacing-sm;
				font-size: $font-sm + 2upx;
				margin-right: $spacing-base;
				color: $font-color-dark;
				background-color: $page-color-base;
				border-radius: 6upx;
			}
		}
	}

	.tui-product-container {
		flex: 1;
		margin-right: 10upx;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.category-product-list {
		margin-bottom: 15upx;
		padding-bottom: 15upx;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.08);
	}

	.category-product-list:last-child {
		border-bottom: none;
		background-color: #007aff;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 20upx;
		background: $color-white;
		box-sizing: border-box;
		border-radius: 12upx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}

	.tui-flex-list {
		display: flex;
		margin-bottom: 1upx !important;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-proimg-list {
		width: 160upx;
		height: 160upx !important;
		flex-shrink: 0;
		border-radius: 12upx;
	}

	.tui-pro-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20upx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-sale-price {
		font-size: 34upx;
		font-weight: 500;
	}

	.tui-factory-price {
		font-size: 24upx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12upx;
	}

	.tui-pro-pay {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24upx;
		color: #656565;

		.iconfont {
			font-size: $font-lg + 6upx;
			padding: 0 $spacing-sm;
		}
	}

	.popup .layer {
		// #ifndef H5
		bottom: 0;
		// #endif
	}

	.input-box {
		height: 60upx;
		position: relative;
		display: flex;
		align-items: center;
		margin: 10upx 20upx;

		.iconfont {
			width: 60upx;
			font-size: 48upx;
			font-weight: 500;
		}

		.iconsousuo2 {
			z-index: 999;
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}

		input {
			flex: 1;
			height: 60upx;
			background-color: #f5f5f5;
			padding-left: 28upx;
			border-radius: 30upx;
			color: #888;
			font-size: 28upx;
		}
	}
}
</style>
