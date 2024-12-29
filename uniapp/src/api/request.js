import axios from 'axios'
// 获取所有车位
const getAllStall = '/stallall'

// 获取所有区域
const getAllArea = '/areaAll'

// 获取所有公告
const getAllNotice = '/noticeall'

// 获取所有评价
const getAllEvaluate = '/evaluateall'

// 获取所有成员
const getAllMember = '/queryuserall'

// 查询单个公告
const getNotice = '/notice'

// 登录接口
const login = '/user/login'

// 查询单个车位
const getStall = '/stall'

// 创建订单
const createOrder = '/order/add'

// 获取个人信息
const getMyInfo = '/queryuser'

// 修改个人信息
const updateMyInfo = '/user/amend'

// 获取个人订单
const getMyOrder = '/orderall'

// 完成订单
const finishOrder = '/order/amend'

// 评价
const evaluate = '/evaluate/add'

export {
  getAllStall,
  getAllArea,
  getAllNotice,
  getAllEvaluate,
  getAllMember,
  getNotice,
  login,
  getStall,
  createOrder,
  getMyInfo,
  updateMyInfo,
  getMyOrder,
  finishOrder,
  evaluate
};
