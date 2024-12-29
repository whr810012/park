<template>
    <div class="options-manage">
        <div style="margin-bottom: 20px">
            <el-button type="primary" @click="addOptions">添加</el-button>
            <el-button type="danger" @click="deleteMarkers">删除</el-button>
        </div>
        <el-table ref="multipleTableRef" :data="filterTable" border style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="120" align="center"></el-table-column>
            <el-table-column type="selection" :selectable="selectable" width="55" align="center" />
            <el-table-column property="email" label="邮箱" align="center" />
            <el-table-column property="userName" label="昵称" align="center" />
            <el-table-column property="adminid" label="adminid" align="center" />
            <el-table-column property="sorct" label="权限" align="center">
                <template #default="scope">
                    {{ !!scope.row.sorct ? '超级管理员' : '管理员' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: space-between">
                        <div style="color: #499eff; cursor: pointer;" @click="changeOptions(scope.row)">
                            修改
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-pagination background layout="prev, pager, next" :total="tableData.length"
                v-model:current-page="currentPage"></el-pagination>
        </div> 
        <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="添加管理员" width="500"
            @close="form = {}; dialogFormVisible = false">
            <el-form :model="form" label-width="70px">
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" placeholder="请输入邮箱" autocomplete="off" />
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" placeholder="请输入用户名" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off" type="password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="uploadFrom">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-if="changeVisible" v-model="changeVisible" title="修改管理员信息" width="500"
            @close="form = {}; changeVisible = false">
            <el-form :model="formDetail" label-width="70px">
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="formDetail.email" placeholder="请输入邮箱" autocomplete="off" />
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="formDetail.userName" placeholder="请输入用户名" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="formDetail.password" placeholder="请输入密码" autocomplete="off" type="password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="changeVisible = false">取消</el-button>
                    <el-button type="primary" @click="changeDetail">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getAllAdmin, deleteAdmin, addAdmin, updateAdmin, deleteAdmins } from "../../api/request.js";
export default {
    name: "marksManage",
    data() {
        return {
            imageshow: false,
            dialogFormVisible: false,
            changeVisible: false,
            form: {
                email: '',
                userName: '',
                password: '',
            },
            formDetail: {
                email: '',
                userName: '',
                password: '',
            },
            tableData: [],
            multipleSelection: [],
            currentPage: 1
        }
    },
    computed: {
        myInfo() {
            return this.$store.state.MyInfo
        },
        filterTable() {
            return this.tableData.filter((item, index) => {
                return index >= (this.currentPage - 1) * 10 && index < this.currentPage * 10
            })
        }
    },
    methods: {
        changeOptions(row) {
            if (!this.myInfo.sorct) {
                return this.$message.error('无权限')
            }
            this.formDetail = {...row}
            this.changeVisible = true
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        addOptions() {
            if (!this.myInfo.sorct) {
                return this.$message.error('无权限')
            }
            this.dialogFormVisible = true
            this.form = {
                email: '',
                userName: '',
                password: '',
            }
        },
        // change
        changeDetail() {
            if (!this.myInfo.sorct) {
                return this.$message.error('无权限')
            }
            const emailStatus = this.checkEmail(this.formDetail.email)
            if (emailStatus) {
                this.$message.error('邮箱格式不正确')
                return
            }
            if (this.formDetail.userName.length < 2) {
                this.$message.error('用户名长度不能小于2')
                return
            }
            if (this.formDetail.password.length < 6) {
                this.$message.error('密码长度不能小于6')
                return
            }
            updateAdmin(this.formDetail).then(() => {
                this.init()
                this.changeVisible = false
            }).catch(() => {
                this.$message.error('修改失败，请稍后再试')
            })
        },
        // 增加
        uploadFrom() {
            if (!this.myInfo.sorct) {
                return this.$message.error('无权限')
            }
            const emailStatus = this.checkEmail(this.form.email)
            if (emailStatus) {
                this.$message.error('邮箱格式不正确')
                return
            }
            if (this.form.userName.length < 2) {
                this.$message.error('用户名长度不能小于2')
                return
            }
            if (this.form.password.length < 6) {
                this.$message.error('密码长度不能小于6')
                return
            }
            const data = {
                email: this.form.email,
                userName: this.form.userName,
                password: this.form.password,
                sorct: 0
            }
            addAdmin(data).then(() => {
                this.init()
                this.dialogFormVisible = false
            }).catch(() => {
                this.$message.error('邮箱已存在')
            })
        },
        // delete
        deleteMarkers() {
            console.log(this.multipleSelection);
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择要删除的标记')
                return
            }
            if (!this.myInfo.sorct) {
                return this.$message.error('无权限')
            }
            const ids = this.multipleSelection.map(item => item.adminid)
            if (this.multipleSelection.find(item => !!item.sorct)) {
                return this.$message.error('不可删除超级管理员')
            }
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'el-button--danger',
                type: 'warning'
            }).then(() => {
                deleteAdmins(ids).then(() => {
                    this.init()
                })
            })
        },
        deleteAdmin(row) {
            console.log(123123);
            if (!this.myInfo.sorct) {
                return this.$message.error('无权限')
            }
            if (row.sorct) {
                return this.$message.error('不可删除超级管理员')
            }
            const id = row.adminid
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'el-button--danger',
                type: 'warning'
            }).then(() => {
                deleteAdmin(id).then(() => {
                    this.init()
                })
            })

        },
        // 判断邮箱格式
        checkEmail(value) {
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (!reg.test(value)) {
                return true
            } else {
                return false
            }
        },
        init() {
            getAllAdmin().then(res => {
                console.log(res.data.data)
                this.tableData = res.data.data
            })
        }

    },
    created() {
        this.$store.commit("setBreadList", [{ title: '管理员管理' }]);
        this.init()
    },
}
</script>