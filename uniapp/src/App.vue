<script>
import { login } from '@/api/request';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
		}
	},
	async onLaunch() {
		// 获取本地缓存是否有myInfo
		const myInfo = uni.getStorageSync('myInfo');
		const openId = uni.getStorageSync('openId');
		if (myInfo && openId) {
			// 存在则直接登录
			this.loading = false
			if (!myInfo.age || !myInfo.carInfo || !myInfo.phone || !myInfo.userName) {
				uni.navigateTo({
					url: '/pages/user/userinfo/userinfo'
				})
			}
		} else {
			// 获取用户信息
			uni.login({
				provider: 'weixin',
				success: async (res) => {
					const { code } = res;
					uni.request({
						url: "https://api.weixin.qq.com/sns/jscode2session",
						method: "get",
						data: {
							appid: "wx09c849e5050a4ad0",
							secret: "0122867f51a9f3de3ab2f8564cbae3a7",
							js_code: code,
							grant_type: "authorization_code",
						},
					})
						.then((res) => {
							const openId = res[1].data.openid;
							this.setOpenId(openId)
							// 将openid存入本地
							uni.setStorageSync('openId', openId);
							this.$http.get(`${login}`, { openId })
								.then(res => {
									const myInfo = res
									this.setMyInfo(myInfo)
									uni.setStorageSync('myInfo', myInfo)
									if (!myInfo.age || !myInfo.carInfo || !myInfo.phone || !myInfo.userName) {
										uni.navigateTo({
											url: '/pages/user/userinfo/userinfo'
										})
									}
								})
						})
				}
			});
		}
	},
	methods: {
		...mapMutations(['setOpenId', 'setMyInfo'])
	}
};
</script>
<style lang="scss">
// 导入colorUI
@import '/static/css/colorui/main.css';
@import '/static/css/colorui/icon.css';
@import '/static/css/colorui/animation.css';
// 导入阿里巴巴矢量图标库
/*#ifdef MP*/
@import './static/css/iconfont/iconfont.css';
/*#endif*/
/*#ifndef MP*/
@import url('https://at.alicdn.com/t/font_1681579_dwilkcq6mvg.css');
/*#endif*/
@import './static/css/reset.scss';
@import './static/css/uni.scss';
</style>
