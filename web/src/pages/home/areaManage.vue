<template>
  <div class="area-manage" style="padding: 20px">
    <el-button type="primary" @click="addShow = true">新增区域</el-button>
    <el-table :data="tableData" style="width: 100%; margin-top: 20px" border >
      <el-table-column prop="areaName" label="区域名称"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" size="small" @click="editDiaShow(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteArea(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="addShow" v-if="addShow" title="新增区域" @close="closeDia">
      <el-form label-width="150px">
        <el-form-item name="newAreaName" label="区域名称:">
          <el-input v-model="newAreaName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addArea">确定</el-button>
          <el-button @click="addShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="editShow" v-if="editShow" title="新增区域" @close="closeDia">
      <el-form label-width="150px" :data="editForm">
        <el-form-item name="newAreaName" label="区域名称:">
          <el-input v-model="editForm.areaName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editArea">确定</el-button>
          <el-button @click="editShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllArea, deleteArea, addArea, updateArea} from '@/api/request'
export default {
  data() {
    return {
      tableData: [
      ],
      addShow: false,
      editShow: false,
      newAreaName:'',
      editForm:{}
    }
  },
  methods:{
    closeDia () {
      this.addShow = false
      this.editShow = false
      this.editForm = {}
      this.newAreaName = ''
    },
    editArea () {
      updateArea(this.editForm).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.closeDia()
        this.getArea()
      })
    },
    editDiaShow (item) {
      this.editForm = {...item}
      this.editShow = true
    },
    async getArea(){
      const res = await getAllArea()
      this.tableData = res.data.data
    },
    addArea () {
      const data = {
        areaName: this.newAreaName,
        areaid: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
      }
      addArea(data).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.closeDia()
        this.getArea()
      })
    },
    deleteArea(item){
      this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        deleteArea([item.areaid]).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getArea()
        })
      })
    }
  },
  created(){
    this.getArea()
  }
}
</script>

<style>

</style>