<template>
	<view class="rf-product-list">
		<view class="rf-product-list-container">
			<block v-for="(item, index) in list" :key="index">
				<!--商品列表-->
				<view
					v-if="(index + 1) % 2 !== 0 || isList"
					class="rf-product-item"
					@tap.stop="navTo(`/pages/product/product`, item)"
					:class="[isList ? 'rf-product-flex-list' : '']"
					hover-class="hover"
					:hover-start-time="150"
				>
					<view class="rf-product-image-wrapper">
						<image :src="item.url[0]" mode="widthFix" :preview="false" :class="[isList?'rf-product-list-img':'rf-product-img']" ></image>
						<text class="sketch in1line">{{ item.areaName }} - {{ item.location }}</text>
						<view class="triangle-wrapper">
							<image class="triangle-tag" :src="item | filterTagName"></image>
						</view>
					</view>
					<view class="rf-pro-content">
						<view v-if="item" style="display: flex;justify-content: space-between; align-items: flex-end;">
							<view class="rf-pro-price">
								<text class="rf-sale-price" :class="'text-'+themeColor.name">{{ moneySymbol }}{{ item.price }}</text>
							</view>
							<view style="color: green;">
								空闲中
							</view>
						</view>
					</view>
				</view>
				<!--商品列表-->
			</block>
		</view>
		<view class="rf-product-list-container" v-if="!isList">
			<block v-for="(item, index) in list" :key="index">
				<!--商品列表-->
				<view
					v-if="(index + 1) % 2 === 0"
					class="rf-product-item"
					@tap.stop="navTo(`/pages/product/product`,item)"
					:class="[isList ? 'rf-product-flex-list' : '']"
					hover-class="hover"
					:hover-start-time="150"
				>
					<view class="rf-product-image-wrapper">
						<image :src="item.url[0]" mode="widthFix" :preview="false" :class="[isList?'rf-product-list-img':'rf-product-img']" ></image>
						<text class="sketch in1line">{{ item.areaName }} - {{ item.location }}</text>
						<view class="triangle-wrapper" v-if="item.shipping_type === '1' || item.is_virtual === '1' || item.commissionRate || item.is_open_presell === '1'">
							<image class="triangle-tag" :src="item | filterTagName"></image>
						</view>
					</view>
					<view class="rf-pro-content">
						<view class="rf-pro-tit">{{ item.name }}</view>
						<view v-if="item" style="display: flex;justify-content: space-between; align-items: flex-end;">
							<view class="rf-pro-price">
								<text class="rf-sale-price" :class="'text-'+themeColor.name">{{ moneySymbol }}{{ item.price }}</text>
							</view>
							<view style="color: green;">
								空闲中
							</view>
						</view>
					</view>
				</view>
				<!--商品列表-->
			</block>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view
			class="popup spec show"
			v-if="specClass === 'show'"
			@touchmove.stop.prevent="stopPrevent"
			@tap="hideSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask" @tap="hideSpec"></view>
		</view>
	</view>
</template>
<script>
/**
 * @des 商品列表
 *
 * @author stav stavyan@qq.com
 * @date 2020-05-15 10:49
 */
import { productDetail, cartItemCount, cartItemCreate } from '@/api/product';
import rfAttrContent from '@/components/rf-attr-content';
import $mAssetsPath from '@/config/assets.config';
import { mapMutations } from 'vuex';
export default {
	name: 'rfProductList',
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 是否以列表展示 | 列表或大图
		isList: {
			type: Boolean,
			default: false
		},
		// 是否以列表展示 | 列表或大图
		bottom: {
			type: Number,
			default: 0
		}
	},
	components: {
		rfAttrContent
	},
	data() {
		return {
			specClass: 'none',
      moneySymbol: this.moneySymbol,
			productDetail: {}
		};
	},
	filters: {
		filterTotalSales(val) {
			if (val > 10000) {
				val = `${(val / 10000).toFixed(2)}w`;
			}
			return val;
		},
		filterTagName(val) {
			if (val.commissionRate) {
				// 分销商品
				return $mAssetsPath.distribution;
			} else if (val.is_virtual === '1') {
				// 虚拟产品
				return $mAssetsPath.virtual;
			} else if (val.shipping_type === '1') {
				// 包邮产品
				return $mAssetsPath.pinkage;
			}
		}
	},
	methods: {
    ...mapMutations(['setCartNum']),
		// 跳转详情
		navTo(route, item) {
			console.log(item.$orig.stallId)
			const url = `/pages/product/product?id=${item.$orig.stallId}`;
			this.$mRouter.push({ route:url });
		},
		hideSpec() {
			this.specClass = 'hide';
			setTimeout(() => {
				this.specClass = 'none';
			}, 250);
		},
	}
};
</script>
