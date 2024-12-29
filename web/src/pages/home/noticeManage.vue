<template>
  <div class="area-manage" style="padding: 20px">
    <el-button type="primary" @click="openAdd">新增公告</el-button>
    <el-table :data="filterTable" style="width: 100%; margin-top: 20px" border>
      <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
      <el-table-column align="center" prop="noticeId" label="公告编号"></el-table-column>
      <el-table-column align="center" prop="createName" label="创建人"></el-table-column>
      <el-table-column align="center" prop="createTime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column align="center" prop="content" label="内容">
        <template #default="scope">
          <el-popover placement="top-start" trigger="hover" :content="scope.row.content">
            <template #reference>
              <div class="content">
                {{ scope.row.content }}
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small" @click="editNotice(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteNotice(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px;" background layout="prev, pager, next" :total="tableData.length"
      v-model:current-page="currPage"></el-pagination>
    <el-dialog v-if="addShow" v-model="addShow" title="新增公告" center @close="closedia">
      <el-form :data="form" label-width="80px" label-position="right">
        <el-form-item name="title" label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item name="content" label="内容:">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item name="time" label="时间范围:">
          <el-date-picker v-model="form.time" value-format="YYYY-MM-DDTHH:mm:ss" type="datetimerange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div>
          <el-button type="primary" @click="closedia">取消</el-button>
          <el-button type="primary" @click="addNotice">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog v-if="editShow" v-model="editShow" title="编辑公告" center @close="closedia">
      <el-form :data="newForm" label-width="80px" label-position="right">
        <el-form-item name="title" label="标题:">
          <el-input v-model="newForm.title"></el-input>
        </el-form-item>
        <el-form-item name="content" label="内容:">
          <el-input type="textarea" v-model="newForm.content"></el-input>
        </el-form-item>
        <el-form-item name="time" label="时间范围:">
          <el-date-picker v-model="newForm.time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div>
          <el-button type="primary" @click="closedia">取消</el-button>
          <el-button type="primary" @click="changeNotice">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllNotice, addNotice, deleteNotice, updateNotice } from '@/api/request'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      tableData: [
      ],
      addShow: false,
      // 新增
      form: {
        title: '',
        content: '',
        startTime: '',
        endTime: '',
        time: []
      },
      newForm:{},
      editShow: false,
      currPage: 1
    }
  },
  computed: {
    filterTable() {
      return this.tableData.filter((item, index) => {
        return index >= (this.currPage - 1) * 10 && index < this.currPage * 10
      })
    }
  },
  methods: {
    editNotice (item) {
      this.newForm = {...item}
      this.newForm.time = [item.createTime, item.endTime]
      this.editShow = true
    },
    changeNotice() {
      this.newForm.startTime = dayjs(this.newForm.time[0]).format('YYYY-MM-DDTHH:mm:ss')
      this.newForm.endTime = dayjs(this.newForm.time[1]).format('YYYY-MM-DDTHH:mm:ss')
      const data = {
        title: this.newForm.title,
        content: this.newForm.content,
        createTime: this.newForm.startTime,
        endTime: this.newForm.endTime,
        //时间戳+随机整数
        noticeId: this.newForm.noticeId,
        createName: this.$store.state.MyInfo.email
      }
      updateNotice(data).then(() => {
        this.$message.success('修改成功')
        this.closedia()
        this.init()
      })
    },
    closedia() {
      this.addShow = false
      this.editShow = false
      this.newForm = {}
      this.form = {
        title: '',
        content: '',
        startTime: '',
        endTime: '',
        time: []
      }
    },
    openAdd() {
      this.addShow = true
    },
    addNotice() {
      this.form.startTime = dayjs(this.form.time[0]).format('YYYY-MM-DDTHH:mm:ss')
      this.form.endTime = dayjs(this.form.time[1]).format('YYYY-MM-DDTHH:mm:ss')
      const data = {
        title: this.form.title,
        content: this.form.content,
        createTime: this.form.startTime,
        endTime: this.form.endTime,
        //时间戳+随机整数
        noticeId: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
        createName: this.$store.state.MyInfo.email
      }
      addNotice(data).then(() => {
        this.$message.success('添加成功')
        this.closedia()
        this.init()
      })
    },
    deleteNotice(row) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNotice([row.noticeId]).then(() => {
          this.$message.success('删除成功')
          this.init()
        })
      })
    },
    init() {
      getAllNotice().then(res => {
        this.tableData = res.data.data
        this.tableData.forEach(item => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss')
        })
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>