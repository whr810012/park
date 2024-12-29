<template>
  <div class="goodsManage">
    <el-table :data="filterList" style="width: 100%" border>
      <el-table-column
        label="序号"
        width="120"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column property="orderid" label="订单号" align="center">
      </el-table-column>
      <el-table-column property="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="outTime" label="离场时间"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="totalPrice" label="总价格"></el-table-column>
      <el-table-column prop="discount" label="折扣">
        <template #default="scope">
          <span v-if="scope.row.discount == 1">无折扣</span>
          <span v-else>{{ scope.row.discount * 10 }}折</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag type="primary" v-if="scope.row.status === 0">预定中</el-tag>
          <el-tag type="success" v-if="scope.row.status === 1">进行中</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 2">已超时</el-tag>
          <el-tag type="info" v-if="scope.row.status === 3">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button type="text" size="small" @click="lookDetail(scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="giveDiscount(scope.row)">折扣设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="TableList.length"
        v-model:current-page="currentPage"
      ></el-pagination>
    </div>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      width="300px"
    >
      <h3>订单详情</h3>
      <div style="margin-top: 10px">订单号： {{ orderInfo.orderid }}</div>
      <div style="margin-top: 10px">买家： {{ orderInfo.userName }}</div>
      <div style="margin-top: 10px">车辆信息： {{ orderInfo.carInfo }}</div>
      <div style="margin-top: 10px">
        停放位置： {{ orderInfo.areaName }} - {{ orderInfo.location }}
      </div>
      <div style="margin-top: 10px">
        订单创建时间： {{ orderInfo.createTime }}
      </div>
      <div style="margin-top: 10px">
        订单开始时间： {{ orderInfo.startTime }}
      </div>
      <div style="margin-top: 10px">订单结束时间： {{ orderInfo.endTime }}</div>
      <div style="margin-top: 10px">车主离开时间： {{ orderInfo.outTime }}</div>
      <div style="margin-top: 10px">
        订单状态：
        <span>
          <el-tag type="primary" v-if="orderInfo.status === 0">预定中</el-tag>
          <el-tag type="success" v-if="orderInfo.status === 1">进行中</el-tag>
          <el-tag type="danger" v-if="orderInfo.status === 2">已超时</el-tag>
          <el-tag type="info" v-if="orderInfo.status === 3">已完成</el-tag>
        </span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getAllOrder,
  getAllArea,
  getOrderDetail,
  updateOrder
} from "@/api/request";
import dayjs from "dayjs";
export default {
  data() {
    return {
      TableList: [],
      currentPage: 1,
      drawer: false,
      orderInfo: {},
      areaList: [],
      stallList: [],
      userList: [],
    };
  },
  computed: {
    filterList() {
      return this.TableList.filter((item, index) => {
        return (
          index < this.currentPage * 10 && index >= (this.currentPage - 1) * 10
        );
      });
    },
  },
  methods: {
    giveDiscount(row) {
      this.$prompt("请输入折扣(0.01~1之间，例如0.9代表九折)", "提示", {
      }).then(({ value }) => {
        const data = {
        orderid: row.orderid,
        discount: value
      }
        updateOrder(data).then(() => {
          this.init()
          this.$message({
            type: "success",
            message: "折扣为: " + value,
          });
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消输入",
        });
      })
    },
    handleSelectionChange(val) {
      this.checkGoods = val;
    },
    lookDetail(row) {
      getOrderDetail(row.orderid).then((res) => {
        console.log();
        this.orderInfo = res.data.data;
        this.orderInfo.createTime = dayjs(this.orderInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
        this.orderInfo.startTime = dayjs(this.orderInfo.startTime).format("YYYY-MM-DD HH:mm:ss")
        this.orderInfo.outTime = dayjs(this.orderInfo.outTime).format("YYYY-MM-DD HH:mm:ss")
        this.orderInfo.endTime = dayjs(this.orderInfo.endTime).format("YYYY-MM-DD HH:mm:ss")
        this.areaList.map((area) => {
          if (this.orderInfo.areaid === area.areaid) {
            this.orderInfo.areaName = area.areaName;
          }
        });
        this.drawer = true;
      });
    },
    init() {
      getAllOrder().then((res) => {
        console.log(res.data.data);
        this.TableList = res.data.data;
        this.TableList.forEach((item) => {
          item.createTime = dayjs(item.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          item.outTime = dayjs(item.outTime).format("YYYY-MM-DD HH:mm:ss");
          item.startTime = dayjs(item.startTime).format("YYYY-MM-DD HH:mm:ss");
          item.endTime = dayjs(item.endTime).format("YYYY-MM-DD HH:mm:ss");
          this.areaList.map((area) => {
            if (item.areaId === area.areaid) {
              item.areaName = area.areaName;
            }
          });
        });
      });
    },
  },
  created() {
    getAllArea().then((res) => {
      console.log(res.data.data);
      this.areaList = res.data.data;
    });
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.goodsManage {
  margin: 10px;
}

.description {
  // 只显示两行
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>