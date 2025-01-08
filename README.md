# 停车系统前端代码

## 项目简介

本项目是一个停车系统的前端代码，包括客户端和后台管理系统的前端部分。项目使用Vue.js框架开发，支持多平台运行，包括H5、小程序、App等。

## 软件架构

前端使用Vue.js、uniapp框架

## 安装教程
web
1. 克隆项目到本地
2. 安装依赖：`npm install`
3. 运行项目：`npm run serve`
uniapp
1. 克隆项目到本地
2. 安装依赖：`npm install`
3. 运行项目：`npm run dev:mp-weixin`

## 使用说明

1. 项目启动后，访问`http://localhost:8080`即可查看客户端页面。
2. 后台管理系统访问`http://localhost:8080/admin`。

## 目录结构

```
- uniapp
  - src
    - api // 接口定义
    - components // 组件
    - pages // 页面
    - static // 静态资源
    - store // 状态管理
    - utils // 工具函数
  - public // 公共资源
  - package.json // 项目依赖
- web
  - src
    - api // 接口定义
    - components // 组件
    - pages // 页面
    - router // 路由配置
    - store // 状态管理
    - utils // 工具函数
  - public // 公共资源
  - package.json // 项目依赖
```

## 功能模块

### 客户端

- 首页：展示推荐车位、最新公告、评价预览等。
- 车位详情：查看车位详细信息，包括价格、状态、位置等。
- 订单管理：用户可以查看、创建、完成订单。
- 用户中心：用户可以查看个人信息、订单、足迹等。

### 后台管理系统

- 车位管理：管理员可以新增、编辑、删除车位。
- 区域管理：管理员可以管理停车区域。
- 订单管理：管理员可以查看、编辑订单。
- 用户管理：管理员可以查看、管理用户信息。
- 公告管理：管理员可以发布、编辑、删除公告。
- 评价管理：管理员可以查看用户评价。

## 参与贡献

1. Fork项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 将您的更改推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 特技

- 使用Vue.js框架，支持多平台运行。
- 响应式设计，适配多种屏幕尺寸。
- 丰富的组件库，方便快速开发。

## 更新记录

请查看`uniapp/docs/UPDATE.md`文件获取详细的更新记录。
