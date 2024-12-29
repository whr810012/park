<template>
  <div class="area-manage" style="padding: 20px">
    <el-button type="primary" @click="addShow = true">新增车位</el-button>
    <el-table :data="tableDataFilter" style="width: 100%; margin-top: 20px" border>
      <el-table-column prop="stallId" label="车位编号"></el-table-column>
      <el-table-column prop="areaName" label="所在区域"></el-table-column>
      <el-table-column prop="location" label="具体位置"></el-table-column>
      <el-table-column prop="price" label="价格">
        <template #default="scope">
          {{ scope.row.price }}元/小时
        </template>
      </el-table-column>
      <el-table-column prop="status" label="车位状态">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status === 0">空闲</el-tag>
          <el-tag type="warning" v-if="scope.row.status === 1">已预定</el-tag>
          <el-tag type="error" v-if="scope.row.status === 2">已停车</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="createName" label="创建人"></el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template #default="scope">
          <el-button type="text" size="small" @click="editDia(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deletePark(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="lookDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination background layout="prev, pager, next" :total="tableData.length"
        v-model:current-page="currentPage"></el-pagination>
    </div>
    <el-dialog v-if="addShow" v-model="addShow" title="新增车位" @close="closeDia">
      <el-form :data="newForm" label-width="100px">
        <el-form-item name="areaid" label="所在区域:">
          <el-select v-model="newForm.areaid">
            <el-option v-for="item in areaList" :key="item.areaid" :label="item.areaName"
              :value="item.areaid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item name="location" label="具体位置:">
          <el-input v-model="newForm.location"></el-input>
        </el-form-item>
        <el-form-item name="price" label="价格:">
          <el-input-number min="0" v-model="newForm.price"></el-input-number>
        </el-form-item>
        <el-form-item name="images" label="车位照片">
          <el-upload :auto-upload="false" limit="3" v-model:file-list="newForm.images" action="" list-type="picture-card">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <div>
          <el-button @click="closeDia">取消</el-button>
          <el-button type="primary" @click="addStall">
            确认
          </el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog v-if="editShow" v-model="editShow" title="编辑车位" @close="closeDia">
      <el-form :data="editForm" label-width="100px">
        <el-form-item name="areaid" label="所在区域:">
          <el-select v-model="editForm.areaid">
            <el-option v-for="item in areaList" :key="item.areaid" :label="item.areaName"
              :value="item.areaid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item name="location" label="具体位置:">
          <el-input v-model="editForm.location"></el-input>
        </el-form-item>
        <el-form-item name="price" label="价格:">
          <el-input-number min="0" v-model="editForm.price"></el-input-number>
        </el-form-item>
        <div>
          <el-button @click="closeDia">取消</el-button>
          <el-button type="primary" @click="editStall">
            确认
          </el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      width="300px"
    >
      <h3>车位详情</h3>
      <div style="margin-top: 10px">车位编号： {{ stallDetail.stallId }}</div>
      <div style="margin-top: 10px">
        所属区域： {{ stallDetail.areaName }}
      </div>
      <div style="margin-top: 10px">具体位置： {{ stallDetail.location }}</div>
      <div style="margin-top: 10px">价格： {{ stallDetail.price }}元/小时</div>
      <div style="margin-top: 10px">
        车位状态：
        <span>
          <el-tag type="success" v-if="stallDetail.status === 0">空闲</el-tag>
          <el-tag type="warning" v-if="stallDetail.status === 1">已预定</el-tag>
          <el-tag type="error" v-if="stallDetail.status === 2">已停车</el-tag>
        </span>
      </div>
      <div style="margin-top: 10px">
        车位照片：
        <div class="demo-image__preview" v-for="(item, index) in stallDetail.url" :key="item">
          <el-image
            style="width: 100px; height: 100px"
            :src="item"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="stallDetail.url"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getAllPark, addPark, deletePark, updatePark, getAllArea } from '@/api/request'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      tableData: [
      ],
      currentPage: 1,
      areaList: [],
      addShow: false,
      newForm: {
        areaid: '',
        createName: "",
        createTime: "",
        location: "",
        price: 0,
        stallId: 0,
        status: 0,
        images:[]
      },
      editShow: false,
      editForm: {

      },
      drawer:false
    }
  },
  computed: {
    tableDataFilter() {
      return this.tableData.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    }
  },
  methods: {
    lookDetail(row) {
      this.stallDetail = row
      this.drawer = true
    },
    closeDia() {
      this.addShow = false
      this.editShow = false
      this.editForm = {}
      this.newForm = {
        areaid: '',
        createName: "",
        createTime: "",
        location: "",
        price: 0,
        stallId: 0,
        status: 0
      }
    },
    editDia(item) {
      this.editShow = true
      this.editForm = {...item}
    },
    editStall() {
      const data = {
        areaid: this.editForm.areaid,
        createName: this.editForm.createName,
        createTime: dayjs(this.editForm.createTime).format('YYYY-MM-DDTHH:mm:ss'),
        location: this.editForm.location,
        price: this.editForm.price,
        stallId: this.editForm.stallId,
        status: this.editForm.status
      }
      updatePark(data).then(() => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.closeDia()
        this.init()
      })
    },
    addStall() {
      const formData = new FormData()
      this.newForm.images.forEach(item => {
        formData.append('images', item.raw)
      })
      formData.append('areaid', this.newForm.areaid)
      formData.append('createName', this.$store.state.MyInfo.email)
      formData.append('createTime', dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'))
      formData.append('location', this.newForm.location)
      formData.append('price', this.newForm.price)
      formData.append('stallId', Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000))
      formData.append('status', 0)
      addPark(formData).then(() => {
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
        this.closeDia()
        this.init()
      })
    },
    deletePark(row) {
      this.$confirm('确定删除该车位吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePark([row.stallId]).then(() => {
          this.$message.success('删除成功')
          this.init()
        })
      })
    },
    init() {
      getAllPark().then(res => {
        this.tableData = Object.values(res.data.data.reduce((acc, item) => {
            // 如果该stallId已经存在，则合并url
            if (!acc[item.stallId]) {
                acc[item.stallId] = { ...item, url: [item.url] }
            } else {
                acc[item.stallId].url.push(item.url)
            }
            return acc
        }, {}))
        console.log(this.tableData);
        getAllArea().then(area => {
          this.areaList = area.data.data
          this.tableData.forEach(item => {
            item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
            this.areaList.map(area => {
              if (item.areaid === area.areaid) {
                item.areaName = area.areaName
              }
            })
          })
        })
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>