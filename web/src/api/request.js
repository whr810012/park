// import axios from "axios";
import { request } from "./index";
import axios from "axios";

/***************后台管理员接口************************************************/ 
// 登录
export function Login (data) {
  return request({
    url:"/admin/login",
    method:"POST",
    data
  })
}

// 查询所有管理员
export function getAllAdmin () {
  return request({
    url:"/adminall",
    method:"GET"
  })
}

// 增加管理员
export function addAdmin (data) {
  return request({
    url:"/admin/add",
    method:"POST",
    data
  })
}

// 删除管理员
export function deleteAdmin (data) {
  return request({
    url:`/admin/delete?adminid=${data}`,
    method:"get",
    data
  })
}

// 批量删除
export function deleteAdmins (data) {
  return request({
    url:"/admin/delete",
    method:"POST",
    data
  })
}

// 修改管理员
export function updateAdmin (data) {
  return request({
    url:"/admin/amend",
    method:"POST",
    data
  })
}

/***************后台用户相关接口************************************************/ 

// 查询所有用户
export function getAllUser () {
  return request({
    url:"/queryuserall",
    method:"GET"
  })
}
// 注销用户
export function deleteUser (data) {
  return request({
    url:`/user/detele`,
    method:"post",
    data
  })
}

/***************后台公告相关接口************************************************/ 

// 查询所有公告
export function getAllNotice () {
  return request({
    url:"/noticeall",
    method:"GET"
  })
}
// 删除公告
export function deleteNotice (data) {
  return request({
    url:`/notice/delete`,
    method:"post"
    ,data
  })
}
// 修改公告
export function updateNotice (data) {
  return request({
    url:"/notice/amend",
    method:"POST",
    data
  })
}

// 增加公告
export function addNotice (data) {
  return request({
    url:"/notice/add",
    method:"POST",
    data
  })
}

/***************后台车位相关接口************************************************/ 
// 获取所有车位
export function getAllPark () {
  return request({
    url:"/stallall",
    method:"GET"
  })
}
// 新增
export function addPark (data) {
  return axios({
    url:"http://localhost:8080/stall/add",
    method:"POST",
    data
  })
}
// 删除
export function deletePark (data) {
  return request({
    url:`/stall/delete`,
    method:"post",
    data
  })
}
// 修改
export function updatePark (data) {
  return request({
    url:"/stall/amend",
    method:"POST",
    data
  })
}

/***************后台订单相关接口************************************************/ 
// 获取所有订单
export function getAllOrder () {
  return request({
    url:"/orderall",
    method:"GET"
  })
}
// 查询订单详情
export function getOrderDetail (data) {
  return request({
    url:`/order/all?orderid=${data}`,
    method:"get"
  })
}

/***************后台区域相关接口************************************************/ 
// 获取所有区域
export function getAllArea () {
  return request({
    url:"/areaAll",
    method:"GET"
  })
}
// 删除区域
export function deleteArea (data) {
  return request({
    url:`/area/delete`,
    method:"post",
    data
  })
}
// 新增区域
export function addArea (data) {
  return request({
    url:"/area/add",
    method:"POST",
    data
  })
}
// 编辑区域
export function updateArea (data) {
  return request({
    url:"/area/amend",
    method:"POST",
    data
  })
}

// 获取评价
export function getComment () {
  return request({
    url:"/evaluateall",
    method:"GET"
  })
}

// 修改订单
export function updateOrder (data) {
  return request({
    url:"/order/amend",
    method:"POST",
    data
  })
}