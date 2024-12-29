<template>
	<view class="notify">
		<view class="notify-list" v-if="notifyList.length > 0" style="margin-top: 3px;">
			<view v-for="(item, index) in notifyList" :key="index" class="row" @tap="navTo(item)">
				<view class="carrier" :class="[theIndex === index ? 'open' : oldIndex === index ? 'close' : '']">
					<view class="notify-wrapper">
						<view class="title in1line">{{ item.title }}</view>
						<view class="content in2line">{{ item.content }}</view>
						<view class="time">{{ item.createTime }}</view>
						<uni-tag class="type" type="error" size="small" />
						<view class="un-read" :class="'bg-' + themeColor.name"></view>
					</view>
				</view>
				<rf-load-more v-if="notifyList.length > 0" :status="loadingType" />
			</view>
		</view>
		<!--消息为空-->
		<rf-empty :bottom="bottom" info="暂无公告通知" v-if="notifyList.length === 0"></rf-empty>
		<rfLoading isFullScreen :active="loading"></rfLoading>
		<rfLoading isFullScreen :active="!isLogin" :text="'正在登录,请稍后...'"></rfLoading>
	</view>
</template>
<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import moment from '@/common/moment';
import { getAllNotice } from '@/api/request';
export default {
	components: { rfLoadMore },
	data() {
		return {
			loading: true,
			notifyList: [],
			loadingType: 'more',
			page: 1,
			hasLogin: false,
			// 控制滑动效果
			theIndex: null,
			oldIndex: null
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
	},
	onShow() {
		if (!this.isLogin) {
			return
		}
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
		bottom() {
			let bottom = 0;
			/*  #ifdef H5  */
			bottom = 90;
			/*  #endif */
			return bottom;
		}
	},
	methods: {
		// 数据初始化
		initData() {
			this.$http.get(`${getAllNotice}`).then(res => {
				this.notifyList = res
				this.notifyList.forEach(item => {
					item.createTime = this.$mHelper.formatTime(item.createTime)
				})
				this.loading = false
			})
				.catch(() => {
					this.loading = false
				})
		},
		// 通用跳转
		navTo(route, type) {
			console.log(route);
			this.homeActive = true;
			if (type === 'tab') {
				this.$mRouter.switchTab({ route });
			} else {
				this.$mRouter.push({route:`/pages/index/notice/detail?noticeId=${route.noticeId}`});
			}
		},
	}
};
</script>
<style lang="scss">
page {
	background-color: $page-color-base;
}

.notify {
	.header {
		width: 100%;
		padding-left: $font-lg;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.title {
			font-size: 36upx;
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.notify-list {
		.read {
			text-align: right;
			margin-right: $spacing-base;
			margin-top: $spacing-base;
			margin-bottom: $spacing-sm;

			text {
				margin-left: $spacing-base;
			}
		}

		.row {
			width: calc(94%);
			height: calc(22vw + 40upx);
			margin: 0 auto $spacing-base;
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.iconfont {
					color: #fff;
					font-size: 60upx;
				}

				position: absolute;
				width: 29%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;
			}
		}

		.notify-wrapper {
			background-color: $color-white;
			width: 100%;
			padding: $spacing-base $spacing-lg $spacing-base 80upx;
			margin: $spacing-base 0 0;
			border-radius: 15upx;
			position: relative;

			.title {
				font-size: $font-lg;
				color: $font-color-dark;
				font-weight: 500;
				margin: 0 0 $spacing-sm;
			}

			.content {
				font-size: $font-sm;
				color: $font-color-base;
				height: 75upx;
				line-height: 36upx;
				// 只显示一行
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}

			.time {
				font-size: $font-base;
				color: $font-color-light;
			}

			.type {
				position: absolute;
				top: 26upx;
				left: -10upx;
				border: none;
				font-size: $font-sm;
				opacity: 0.8;
			}

			.un-read {
				display: inline-block;
				width: 12upx;
				height: 12upx;
				border-radius: 50%;
				position: absolute;
				top: 32upx;
				right: 30upx;
			}
		}
	}

	.notify-empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		.iconfont {
			font-size: $font-lg + 100upx;
		}

		.empty-tips {
			display: flex;
			font-size: $font-sm + 2upx;
			color: $font-color-disabled;

			.navigator {
				margin-left: 16upx;
			}
		}
	}
}
</style>
