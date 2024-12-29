<template>
	<view class="container product-list">
		<view class="rf-header-box">
			<view class="rf-header" :style="{ width: width + 'px', height: height + 'px' }">
				<view class="rf-back" :style="{ marginTop: arrowTop + 'px' }" @tap="back">
					<text class="iconfont iconzuo"></text>
				</view>
				<view class="input-box" :style="{ marginTop: inputTop + 'px' }">
					<input v-model="keyword" placeholder="请输入关键字"
						placeholder-style="font-size: 24upx; color:#ccc;" type="text" />
					<text class="icon iconfont iconsousuo2"></text>
				</view>
			</view>
		</view>
		<view class="rf-header-screen" :style="{ top: height + 'px' }">
			<view class="rf-screen-top">
				<view class="rf-top-item rf-icon-ml" :class="[tabIndex == 0 ? `text-${themeColor.name} rf-bold` : '']" data-index="0"
					@tap="screen">
					<text>{{ selectedName }}</text>
					<text class="iconfont" :class="selectH > 0 ? 'iconshang' : 'iconxia'"
						:style="{ color: tabIndex == 0 ? themeColor.color : '#444' }"></text>
				</view>
				<view class="rf-top-item" @tap="screen" data-index="2">
					<text class="iconfont" :class="isList > 0 ? 'iconliebiaoqiehuan' : 'iconfenlei'"></text>
				</view>
				<view class="rf-top-item rf-icon-ml" @tap="screen" data-index="3">
					<text>筛选</text>
					<!--<rf-icon name="screen" :size="12" color="#333" rf-icon-class="rf-ml" :bold="true"></rf-icon>-->
				</view>
				<!--下拉选择列表--综合-->
				<view class="rf-dropdownlist" :class="[selectH > 0 ? 'rf-dropdownlist-show' : '']" :style="{ height: selectH + 'upx' }">
					<view class="rf-dropdownlist-item rf-icon-middle" :class="[item.selected ? 'rf-bold' : '']"
						v-for="(item, index) in dropdownList" :key="index" @tap.stop="dropdownItem" :data-index="index">
						<text class="rf-ml rf-middle">{{ item.name }}</text>
						<text class="iconfont icongouxuan" :class="'text-' + themeColor.name" v-if="item.selected"></text>
					</view>
				</view>
				<view class="rf-dropdownlist-mask" :class="[selectH > 0 ? 'rf-mask-show' : '']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->
			</view>
			<view class="rf-screen-bottom" v-if="attrArr.length > 0">
				<block v-for="(item, index) in attrArr" :key="index">
					<view class="rf-bottom-item rf-icon-ml"
						:class="[item.isActive ? `bg-${themeColor.name} rf-btmItem-active` : 'rf-btmItem-normal', attrIndex == index ? 'rf-btmItem-tap' : '']"
						:data-index="index" @tap="btnDropChange">
						{{ item.areaName }}
					</view>
				</block>
			</view>
		</view>
		<view class="product-list-wrapper">
			<rf-product-list :bottom="0" :list="filterList" :isList="isList"
				:style="{ paddingTop: dropScreenH + 10 + 'upx' }"></rf-product-list>
		</view>
		<rf-empty :info="errorInfo || '该分类暂无商品'" v-if="filterList.length === 0 && !loading"></rf-empty>
		<!--顶部下拉筛选弹层 属性-->
		<rf-top-drawer bgcolor="#f7f7f7" :show="dropScreenShow" :paddingbtm="110" :translatey="dropScreenH"
			@close="btnCloseDrop">
			<scroll-view class="rf-scroll-box" scroll-y :scroll-top="scrollTop">
				<view class="rf-seizeaseat-20"></view>
				<view class="rf-drop-item rf-icon-middle" :class="[item.selected ? 'rf-bold' : '']" v-for="(item, index) in attrData"
					:key="index" @tap.stop="btnSelected" :data-index="index">
					<text class="iconfont icongouxuan" :class="'text-' + themeColor.name" :size="16" :bold="true"
						v-if="item.selected" rf-icon-class="rf-middle"></text>
					<text class="rf-ml rf-middle">{{ item.name }}</text>
				</view>
				<view class="rf-seizeaseat-30"></view>
			</scroll-view>
			<view class="rf-drop-btnbox">
				<view class="rf-drop-btn" :class="'text-' + themeColor.name" :hover-stay-time="150" @tap="reset">重置</view>
				<view class="rf-drop-btn" :class="'bg-' + themeColor.name" :hover-stay-time="150" @tap="btnSure">确定</view>
			</view>
		</rf-top-drawer>
		<!---顶部下拉筛选弹层 属性-->
		<!--左抽屉弹层 筛选 -->
		<uni-drawer class="rf-drawer" :visible="drawer" mode="right" @close="closeDrawer()">
			<view class="rf-drawer-box" :style="{ paddingTop: height + 'px' }">
				<scroll-view class="rf-drawer-scroll" scroll-y :style="{ height: drawerH + 'px' }">
					<view class="rf-drawer-title">
						<text class="rf-title-bold">价格区间</text>
						<view class="rf-attr-right" :class="'text-' + themeColor.name">
							<text>请输入价格区间</text>
						</view>
					</view>
					<view class="rf-drawer-content">
						<input placeholder-class="rf-phcolor" v-model="minPrice" class="rf-input" placeholder="最低价" maxlength="11"
							type='number' />
						<text>-</text>
						<input placeholder-class="rf-phcolor" v-model="maxPrice" class="rf-input" placeholder="最高价" maxlength="11"
							type='number' />
					</view>
					<view class="rf-safearea-bottom"></view>
				</scroll-view>
				<view class="rf-attr-btnbox">
					<view class="rf-attr-safearea">
						<view class="rf-drawer-btn rf-drawerbtn-black" :class="'text-' + themeColor.name"
							hover-class="rf-white-hover" :hover-stay-time="150" @tap="reset">重置</view>
						<view class="rf-drawer-btn rf-drawerbtn-primary" :class="'bg-' + themeColor.name" hover-class="rf-red-hover"
							:hover-stay-time="150" @tap="closeDrawer">确定</view>
					</view>
				</view>
			</view>
		</uni-drawer>
		<!--左抽屉弹层 筛选-->
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>
<script>
import uniDrawer from '@/components/uni-drawer/drawer';
import rfTopDrawer from '@/components/rf-top-drawer';
import rfAttrContent from '@/components/rf-attr-content';
import rfProductList from '@/components/rf-product-list';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import {
	getAllStall,
	getAllArea
} from '@/api/request';
/* eslint-disable */
export default {
	components: {
		uniDrawer,
		rfProductList,
		rfAttrContent,
		rfLoadMore,
		rfTopDrawer
	},
	filters: {
		filterTotalSales(val) {
			if (val > 10000) {
				val = `${(val / 10000).toFixed(2)}w`;
			}
			return val;
		}
	},
	data() {
		return {
			checkAttr:'',
			keyword: '',
			errorInfo: '',
			loadingType: 'more',
			page: 1,
			loading: false,
			specClass: 'none',
			productDetail: {},
			searchKey: "", //搜索关键词
			width: 200, //header宽度
			height: 64, //header高度
			inputTop: 0, //搜索框距离顶部距离
			arrowTop: 0, //箭头距离顶部距离
			dropScreenH: 0, //下拉筛选框距顶部距离
			attrData: [],
			attrIndex: -1,
			dropScreenShow: false,
			scrollTop: 0,
			tabIndex: 0, //顶部筛选索引
			isList: false, //是否以列表展示  | 列表或大图
			drawer: false,
			drawerH: 0, //抽屉内部scrollview高度
			selectedName: "综合",
			selectH: 0,
			dropdownList: [{
				name: "综合",
				selected: true,
				param: {}
			}, {
				name: "价格升序",
				selected: false,
				param: { price: 'asc' }
			}, {
				name: "价格降序",
				selected: false,
				param: { price: 'desc' }
			}],
			attrArr: [
			],
			productList: [
			],
			pageIndex: 1,
			pullUpOn: true,
			productCateList: [],
			brandList: [],
			currentCateStr: '',
			currentBrandStr: '',
			minPrice: '',
			maxPrice: '',
			productParams: {}
		}
	},
	onLoad(options) {
		let obj = {};
		// #ifdef MP-WEIXIN
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-BAIDU
		obj = swan.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-ALIPAY
		my.hideAddToDesktopMenu();
		// #endif
		uni.getSystemInfo({
			success: (res) => {
				this.width = obj.left || res.windowWidth;
				this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
				this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight + 7);
				this.arrowTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
				this.searchKey = options.searchKey || "";
				//略小，避免误差带来的影响
				this.dropScreenH = this.height * 750 / res.windowWidth + 186;
				this.drawerH = res.windowHeight - uni.upx2px(100) - this.height
			}
		});
		this.getAllArea()
		this.initData(options);
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.productList.length = 0;
		this.getProductList();
	},
	// 加载更多
	onReachBottom() {
		if (this.loadingType === 'nomore') return;
		this.page++;
		this.getProductList();
	},
	computed:{
		filterList(){
			console.log(this.attrArr)
			let list = this.productList;
			if (this.checkAttr) {
				console.log(this.checkAttr)
				if(this.checkAttr.id == 'all') {
					return list = this.productList
				}
				list = list.filter(item => item.areaid == this.checkAttr.id)
			}
			if(this.dropdownList[1].selected) {
				// 价格升序
				list.sort((a,b) => a.price - b.price)
			}
			if(this.dropdownList[2].selected) {
				// 价格降序
				list.sort((a,b) => b.price - a.price)
			}
			if (this.keyword) {
				list = list.filter(item => item.location.includes(this.keyword) || item.areaName.includes(this.keyword))
			}
			if(this.minPrice) {
				list = list.filter(item => item.price >= this.minPrice)
			}
			if(this.maxPrice) {
				list = list.filter(item => item.price <= this.maxPrice)
			}
			return list
		}
	},
	methods: {
		// 初始化数据
		initData(options) {
			if (options.keyword) {
				this.keyword = options.keyword;
			}
			this.getProductList()
		},
		px(num) {
			return uni.upx2px(num) + "px"
		},
		btnDropChange(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			this.attrIndex = index;
			this.checkAttr = this.attrArr[index]
			this.attrArr.forEach(item => item.isActive = false)
			this.attrArr[index].isActive = !this.attrArr[index].isActive
			console.log(this.attrArr)
		},
		btnSelected(e) {
			let index = e.currentTarget.dataset.index;
			this.$set(this.attrData[index], "selected", !this.attrData[index].selected)
		},
		async reset() {
			this.currentBrandStr = '';
			this.currentCateStr = '';
			this.minPrice = '';
			this.maxPrice = '';
		},
		btnCloseDrop() {
			this.scrollTop = 1;
			this.$nextTick(() => {
				this.scrollTop = 0
			});
			this.dropScreenShow = false;
			this.attrIndex = -1
		},
		btnSure() {
			let index = this.attrIndex;
			let arr = this.attrData;
			let active = false;
			let attrName = "";
			//这里只是为了展示选中效果,并非实际场景
			for (let item of arr) {
				if (item.selected) {
					active = true;
					attrName += attrName ? ";" + item.name : item.name
				}
			}
			let obj = this.attrArr[index];
		},
		showDropdownList() {
			this.selectH = 246;
			this.tabIndex = 0;
		},
		hideDropdownList() {
			this.selectH = 0
		},
		dropdownItem(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			let arr = this.dropdownList;
			console.log(arr);
			for (let i = 0; i < arr.length; i++) {
				if (i === index) {
					arr[i].selected = true;
				} else {
					arr[i].selected = false;
				}
			}
			this.dropdownList = arr;
		},
		screen(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			if (index === 0) {
				this.showDropdownList();
			} else if (index === 1) {
				let params = {}
				if (this.tabIndex === 1) {
					this.tabIndex = null;
					params.total_sales = 'asc';
				} else {
					this.tabIndex = 1;
					params.total_sales = 'desc';
				}
				this.page = 1;
				this.productList = [];
				this.loading = true;
				this.productParams = params;
				this.getProductList();
			} else if (index === 2) {
				this.isList = !this.isList
			} else if (index === 3) {
				this.drawer = true;
			}
		},
		closeDrawer() {
			this.drawer = false;
			const params = {};
			if (this.maxPrice) {
				params.max_price = this.maxPrice;
			}
			if (this.minPrice) {
				params.min_price = this.minPrice;
			}
			const brandArr = [];
			this.brandList.forEach(item => {
				if (item.isActive) {
					brandArr.push(item.id);
				}
			});
			if (brandArr.join(',')) {
				params.brand_id = brandArr.join(',');
			}
			const cateArr = [];
			this.productCateList.forEach(item => {
				if (item.isActive) {
					cateArr.push(item.id);
				}
			});
			if (cateArr.join(',')) {
				params.cate_id = cateArr.join(',');
			}
			this.page = 1;
			this.productList = [];
			this.loading = true;
			this.productParams = params;
			this.getProductList();
		},
		// 获取商品分类列表
		async getAllArea() {
				await this.$http
				.get(`${getAllArea}`, {})
				.then(async r => {
					this.areaList = r
					this.areaList.forEach(item => {
						item.title = item.areaName
						item.id = item.areaid
					})
					this.attrArr = [{title:'全部', id:'all',areaName:'全部',isActive: true, name: '全部'},...this.areaList];
					this.attrArr.forEach(item => {
						if(item.id !== 'all') {
							item.name = item.areaName;
						  item.isActive = false
						}
					})
					// 首页参数赋值
					this.loading = false;
				})
				.catch((err) => {
					console.log('2222', err);
					this.loading = false;
				});
		},
		back() {
			if (this.drawer) {
				this.closeDrawer()
			} else {
				this.$mRouter.back();
			}
		},
		search() {
			this.page = 1;
			this.productList = [];
			this.loading = true;
			this.productParams = { keyword: this.keyword };
		},
		// 获取商品列表
		async getProductList() {
			await this.$http
				.get(`${getAllStall}`)
				.then(async r => {
					this.loading = false;
					this.productLoading = false;
					this.productList = Object.values(r.reduce((acc, item) => {
						// 如果该stallId已经存在，则合并url
						if (!acc[item.stallId]) {
							acc[item.stallId] = { ...item, url: [item.url] }
						} else {
							acc[item.stallId].url.push(item.url)
						}
						return acc
					}, {}))
					this.areaList.map(area => {
						this.productList.forEach(stall => {
							if (stall.areaid == area.areaid) {
								stall.areaName = area.areaName
							}
						})
					})
					this.productList = this.productList.filter(item => item.status === 0)
				}).catch(() => {
					this.loading = false;
					this.productLoading = false;
				});
		},
		// 跳转详情
		navTo(route) {
			this.$mRouter.push({ route });
		}
	},
}
</script>
<style lang="scss">
page {
	background: $page-color-base;
}

/*顶部下拉选择 属性*/
.rf-scroll-box {
	width: 100%;
	height: 480upx;
	box-sizing: border-box;
	position: relative;
	z-index: 99;
	color: $color-white;
	font-size: 30upx;
	word-break: break-all;
}

.rf-drop-item {
	color: #333;
	height: 80upx;
	font-size: 28upx;
	padding: 20upx 40upx 20upx 40upx;
	box-sizing: border-box;
	display: inline-block;
	width: 50%;
}

.rf-drop-btnbox {
	width: 100%;
	height: 100upx;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
}

.rf-drop-btn {
	width: 50%;
	font-size: 32upx;
	text-align: center;
	height: 100upx;
	line-height: 100upx;
	border: 0;
}

.rf-dropdownlist {
	width: 100%;
	position: absolute;
	background: $color-white;
	border-bottom-left-radius: 24upx;
	border-bottom-right-radius: 24upx;
	overflow: hidden;
	box-sizing: border-box;
	padding-top: 10upx;
	padding-bottom: 26upx;
	left: 0;
	top: 88upx;
	visibility: hidden;
	transition: all 0.2s ease-in-out;
	z-index: 99;

	.icongouxuan {
		font-size: $font-lg;
		line-height: 88upx;
	}
}

.rf-dropdownlist-show {
	visibility: visible;
}

.rf-dropdownlist-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: -1;
	transition: all 0.2s ease-in-out;
	opacity: 0;
	visibility: hidden;
}

.rf-mask-show {
	opacity: 1;
	visibility: visible;
}

.rf-dropdownlist-item {
	color: #333;
	height: 70upx;
	font-size: 28upx;
	padding: 0 40upx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/*顶部下拉选择 综合*/
.rf-drawer-box {
	width: 686upx;
	font-size: 24upx;
	overflow: hidden;
	position: relative;
	padding-bottom: 100upx;
}

.rf-drawer-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30upx;
	box-sizing: border-box;
	height: 80upx;
}

.rf-title-bold {
	font-size: 26upx;
	font-weight: bold;
	flex-shrink: 0;
}

.rf-location {
	margin-right: 6upx;
}

.rf-attr-right {
	width: 70%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: right;
}

.rf-all-box {
	width: 90%;
	white-space: nowrap;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.rf-drawer-content {
	padding: 16upx 30upx 30upx 30upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}

.rf-input {
	border: 0;
	height: 64upx;
	border-radius: 32upx;
	width: 45%;
	background: #f7f7f7;
	text-align: center;
	font-size: $font-base;
	color: #333;
}

.rf-phcolor {
	text-align: center;
	color: #b2b2b2;
	font-size: 24upx;
}

.rf-flex-attr {
	flex-wrap: wrap;
	justify-content: flex-start;
}

.rf-attr-item {
	width: 30%;
	height: 64upx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 4upx;
	box-sizing: border-box;
	border-radius: 32upx;
	margin-right: 5%;
	margin-bottom: 5%;
}

.rf-attr-ellipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 96%;
	text-align: center;
}

.rf-attr-item:nth-of-type(3n) {
	margin-right: 0%;
}

.rf-attr-btnbox {
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	padding: 0 30upx;
	background: $color-white;
}

.rf-attr-safearea {
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/*padding-bottom: env(safe-area-inset-bottom);*/
}

.rf-safearea-bottom {
	width: 100%;
	height: env(safe-area-inset-bottom);
}

.rf-attr-btnbox::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	border-top: 1upx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}

.rf-drawer-btn {
	width: 47%;
	text-align: center;
	height: 60upx;
	border-radius: 30upx;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.rf-drawerbtn-black {
	border: 1upx solid;
}

.product-list {
	padding-bottom: env(safe-area-inset-bottom);

	/* 隐藏scroll-view滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.rf-header-box {
		width: 100%;
		background: $color-white;
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;

		.rf-header {
			display: flex;
			align-items: flex-start;

			.rf-back {
				margin-left: 8upx;
				height: 32px !important;
				width: 32px !important;
				display: flex;
				justify-content: center;
				align-items: center;

				.iconzuo {
					font-size: $font-lg + 4upx;
					font-weight: 500;
					color: $font-color-dark;
				}
			}
		}

		.input-box {
			width: 100%;
			font-size: $font-sm;
			box-sizing: border-box;
			color: #999;
			display: flex;
			align-items: center;
			overflow: hidden;
			height: 60upx;
			background-color: $page-color-base;
			border-radius: 30upx;
			position: relative;
			margin: 0 20upx 0 10upx;

			.iconsousuo2 {
				z-index: 100;
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: $font-lg + 4upx;
				color: $font-color-dark;
			}

			input {
				width: 100%;
				padding-left: 28upx;
				height: 28upx;
				color: $font-color-base;
				font-size: 28upx;
			}
		}
	}

	/*screen*/
	.rf-header-screen {
		width: 100%;
		background: $color-white;
		position: fixed;
		z-index: 99;

		.rf-screen-top,
		.rf-screen-bottom {
			border: none;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: #333;
		}

		.rf-screen-top {
			height: 88upx;
			line-height: 88upx;
			position: relative;
			background: $color-white;
		}

		.rf-top-item {
			height: 28upx;
			line-height: 28upx;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			.iconfont {
				font-size: $font-lg + 4upx;
				font-weight: 500;
			}
		}

		.rf-screen-bottom {
			height: 100upx;
			padding: 0 30upx;
			box-sizing: border-box;
			font-size: 24upx;
			align-items: center;
			overflow: hidden;
		}

		.rf-bottom-text {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.rf-bottom-item {
			flex: 1;
			width: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 12upx;
			box-sizing: border-box;
			margin-right: 20upx;
			white-space: nowrap;
			height: 60upx;
			border-radius: 40upx;
		}

		.rf-bottom-item:last-child {
			margin-right: 0;
		}

		.rf-bold {
			font-weight: bold;
		}

		.rf-active {
			color: $base-color;
		}

		.rf-icon-ml .rf-icon-class {
			margin-left: 6upx;
		}

		.rf-ml {
			margin-left: 6upx;
		}

		.rf-seizeaseat-20 {
			height: 20upx;
		}

		.rf-seizeaseat-30 {
			height: 30upx;
		}

		.rf-icon-middle .rf-icon-class {
			vertical-align: middle;
		}

		.rf-middle {
			vertical-align: middle;
		}
	}

	/*screen*/
	.rf-btmItem-active {
		border-radius: 32upx;
		font-weight: bold;
		position: relative;
	}

	.rf-btmItem-normal {
		border: 1upx solid rgba(0, 0, 0, 0.12);
		position: relative;
	}

	.rf-btmItem-active::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 40upx;
		left: 0;
		top: 0;
	}

	.rf-btmItem-tap {
		position: relative;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.rf-btmItem-tap::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 22upx;
		background: #f7f7f7;
		left: 0;
		top: 58upx;
	}

	.product-list-wrapper {
		/*#ifdef MP*/
		padding-top: 360rpx;
		/*#endif*/
	}
}
</style>
