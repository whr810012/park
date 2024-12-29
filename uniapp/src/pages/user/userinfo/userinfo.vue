<template>
	<view class="userinfo">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<view class="portrait-box">
				<button class="portrait" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image style="width: 100%;height: 100%;" :src="userUrl"></image>
				</button>
			</view>
			<!-- #endif -->
		</view>
		<view class="input-content">
			<view class="input-item">
				<text class="tit">手机号</text>
				<input type="number" v-model="profileInfo.phone" placeholder="请输入手机号码" />
			</view>
			<view class="input-item">
				<text class="tit">昵　称</text>
				<input type="text" v-model="profileInfo.userName" placeholder="请输入您的昵称" />
			</view>
			<view class="input-item">
				<text class="tit">年 龄</text>
				<input type="text" v-model="profileInfo.age" placeholder="请输入您的年龄" />
			</view>
			<view class="input-item">
				<text class="tit">车 牌</text>
				<input type="number" v-model="profileInfo.carInfo" placeholder="请输入您的车牌号" />
			</view>
			<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
				@tap="toUpdateInfo">
				修改资料
			</button>
		</view>
		<!--进度条加载-->
		<rf-load-progress :height="CustomBar" :progress="loadProgress"></rf-load-progress>
	</view>
</template>

<script>
import { getMyInfo, updateMyInfo } from '@/api/request'
import avatar from '@/components/rf-avatar/rf-avatar';
import moment from '@/common/moment';

export default {
	components: { avatar },
	data() {
		return {
			userUrl: '',
			loadProgress: 0,
			CustomBar: this.CustomBar,
			profileInfo: {},
			date: moment().format('YYYY-MM-DD'),
			token: null,
			loading: true,
			headImg: this.$mAssetsPath.headImg,
			userBg: this.$mAssetsPath.userBg,
			btnLoading: false
		};
	},
	onLoad() {
		this.userUrl = uni.getStorageSync('userimg')
		this.initData()
	},
	methods: {
		initData () {
			const openId = this.$store.state.openId
			this.$http.get(`${getMyInfo}`, { openId }).then(r => {
				this.profileInfo = r
				uni.setStorageSync('myInfo', r)
			})
		},
		onChooseAvatar(e) {
			console.log(e);
			uni.setStorageSync("userimg", e.detail.avatarUrl);
			this.userUrl = e.detail.avatarUrl;
		},
		// 更新用户信息
		async toUpdateInfo() {
			console.log(this.profileInfo)
			this.$http.post(`${updateMyInfo}`, this.profileInfo).then(r => {
				this.$mHelper.toast('修改成功')
				this.initData()
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: $color-white;
}

.userinfo {
	.user-section {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 320upx;
		padding: 40upx 30upx 0;
		overflow: hidden;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			opacity: 0.84;
		}

		.portrait-box {
			clear: both;
			z-index: 2;
		}

		.portrait {
			width: 130rpx;
			height: 130rpx;
			padding: 0px !important;
		}

		.yticon {
			position: absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0, 0, 0, 0.4);
		}

		.pt-upload-btn {
			right: 0;
			bottom: 10upx;
		}

		.bg-upload-btn {
			right: 20upx;
			bottom: 16upx;
		}
	}

	.input-content {
		padding: 40upx 60upx;

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
