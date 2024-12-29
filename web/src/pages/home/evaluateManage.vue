<template>
  <div class="evaluateManage">
    <el-radio-group v-model="radio">
      <el-radio-button label="全部"></el-radio-button>
      <el-radio-button v-for="item in areaList" :key="item.areaid" :value="item.areaid" :label="item.areaName"></el-radio-button>
    </el-radio-group>
    <div class="content" style="width:100%">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in commentListFilter" :key="item.evaluateId" style="min-width: 300px !important;margin-top:10px">
          <el-card class="box-card" shadow="hover">
            <div>
              用户：{{ item.userName }}
            </div>
            <el-popover placement="top-start" trigger="hover" :content="item.body">
              <template #reference>
                <div class="body-centet"> 内容：
                    {{ item.body }}
                </div>
              </template>
            </el-popover>
            <div>评分：{{ item.score }}</div>
            <div>时间：{{ item.createTime }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getAllArea, getAllOrder, getAllUser, getComment } from '@/api/request'
export default {
  name: 'evaluateManage',
  data() {
    return {
      commentList: [],
      userList: [],
      orderList: [],
      areaList: [],
      radio: '全部'
    }
  },
  computed: {
    commentListFilter() {
      console.log(this.radio)
      return this.commentList.filter(item => {
        if (this.radio === '全部') {
          return true
        } else {
          return item.areaid == this.radio
        }
      })
    }
  },
  methods: {
    async init() {
      getComment().then(res => {
        this.commentList = res.data.data
        this.commentList.forEach(item => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        })
        getAllUser().then(res => {
          this.userList = res.data.data
          this.userList.map(item => {
            this.commentList.forEach(item1 => {
              if (item.openId == item1.openId) {
                item1.userName = item.userName
              }
            })
          })
        })
        console.log(this.commentList);
      })
      getAllOrder().then(res => {
        this.orderList = res.data.data
      })
      getAllArea().then(res => {
        this.areaList = res.data.data
      })
    }
  },
  created() {
    this.init()
  }
}

</script>

<style lang="scss" scoped>
.evaluateManage {
  padding: 20px
}

.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .body-centet {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>