<template>
	<view class="rf-product-list">
		<view class="rf-product-list-container">
			<block v-for="(item, index) in list" :key="index">
				<view
					v-if="(index + 1) % 2 !== 0 || isList"
					class="rf-product-item"
					:class="[isList ? 'rf-product-flex-list' : '']"
					hover-class="hover"
					:hover-start-time="150"
				>
					<view style="padding:5vw">
						<view>点评人：{{ item.userName}}</view>
						<view>内容：{{ item.body}}</view>
						<view>评分：{{ item.score}}</view>
						<view>时间：{{ item.createTime}}</view>
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
					:class="[isList ? 'rf-product-flex-list' : '']"
					hover-class="hover"
					:hover-start-time="150"
				>
				<view style="padding:5vw">
						<view>点评人：{{ item.userName}}</view>
						<view>内容：{{ item.body}}</view>
						<view>评分：{{ item.score}}</view>
						<view>时间：{{ item.createTime}}</view>
					</view>
				</view>
				<!--商品列表-->
			</block>
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
	name: 'rfEvaluteList',
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
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 获取产品详情
		async getProductDetail(row) {
			await this.$http
				.get(`${productDetail}`, {
					id: row.id
				})
				.then(async r => {
					this.productDetail = await r.data;
					this.productDetail.sku_name = row.sku_name;
					this.specClass = 'show';
				});
		},
		// 规格弹窗开关
		toggleSpec(row) {
			if (parseInt(row.status, 10) === 0) return;
			if (this.specClass === 'show') {
				this.specClass = 'hide';
				if (row.stock === 0) {
					this.$mHelper.toast('库存不足');
					return;
				}
				if (row.type.toString() === '1') {
					// 加入购物车
					this.handleCartItemCreate(row.skuId, row.cartCount);
				} else if (row.type.toString() === '2') {
					// 立即购买
					const list = {};
					const data = {};
					data.sku_id = row.skuId;
					data.num = row.cartCount;
					if (
						this.productDetail.point_exchange_type.toString() === '2' ||
						this.productDetail.point_exchange_type.toString() === '4' ||
						(this.productDetail.point_exchange_type.toString() === '3' &&
							this.isPointExchange)
					) {
						list.type = 'point_exchange';
					} else {
						list.type = 'buy_now';
					}
					list.data = JSON.stringify(data);
					this.navTo(`/pages/order/create/order?data=${JSON.stringify(list)}`);
				}
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			} else if (this.specClass === 'none') {
				this.getProductDetail(row);
			}
		},
		stopPrevent() {},
		hideSpec() {
			this.specClass = 'hide';
			setTimeout(() => {
				this.specClass = 'none';
			}, 250);
		},
		// 添加商品至购物车
		async handleCartItemCreate(skuId, cartCount) {
			await this.$http
				.post(`${cartItemCreate}`, {
					sku_id: skuId,
					num: cartCount
				})
				.then(async () => {
					await this.$http.get(`${cartItemCount}`).then(async r => {
						this.setCartNum(r.data);
					});
					this.$mHelper.toast('添加购物车成功');
				});
		}
	}
};
</script>
