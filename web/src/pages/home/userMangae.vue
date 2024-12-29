<template>
  <div class="userMangae">
    <div style="margin-bottom: 15px;">
      <el-button type="danger" @click="deleteUser">删除用户</el-button>
    </div>
    <div class="table">
      <el-table ref="multipleTableRef" :data="filterTable" style="width: 100%" border
        @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column prop="userName" label="昵称" align="center"></el-table-column>
        <el-table-column prop="age" label="年纪" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="carInfo" label="车辆信息" align="center">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="注册时间"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination background layout="prev, pager, next" :total="tableList.length"
          v-model:current-page="currentPage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUser, deleteUser } from '@/api/request'
import dayjs from 'dayjs'
export default {
  name: 'userMangae',
  data() {
    return {
      tableList: [],
      checkVal: {},
      addUserShow: false,
      changeUserShow: false,
      form: {
        username: '',
        password: ''
      },
      changeForm: {

      },
      currentPage: 1
    }
  },
  computed: {
    filterTable() {
      return this.tableList.filter((item, index) => {
        return index >= (this.currentPage - 1) * 10 && index < this.currentPage * 10
      })
    }
  },
  methods: {
    getUser() {
      getAllUser().then(res => {
        console.log(res.data.result)
        this.tableList = res.data.data
        this.tableList.forEach(item => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        })
      })
    },
    handleSelectionChange(val) {
      this.checkVal = val
    },
    deleteUser() {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const list = this.checkVal.map(item => item.openId)
        deleteUser(list).then(() => {
          this.$message.success('删除成功')
          this.getUser()
        })
      })
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>
.userMangae {
  height: calc(100% - 20px);
  background: #fff;
  padding: 20px 20px 0 20px;
}
</style>