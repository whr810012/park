import { createRouter, createWebHistory } from 'vue-router'
import menu from "../utils/menu";
import store from "../store";
import Login from '../pages/login.vue'
import Home from "@/pages/home.vue";
import mapManage from "@/pages/home/mapManmage.vue";
import Register from '../pages/register.vue'
import userMangae from "../pages/home/userMangae.vue"
import orderManage from "../pages/home/ordersManage.vue"
import statisticsManage from "../pages/home/statisticsManage.vue"
import MyInfo from "@/pages/myInfo.vue"
import goodsDetail from '../pages/goodsDetail.vue'
import stallManage from "@/pages/home/stallManage.vue";
import noticeManage from "@/pages/home/noticeManage.vue";
import areaManage from "@/pages/home/areaManage.vue";
import evaluateManage from '@/pages/home/evaluateManage.vue';

// 定义路由
const routes = [
  {
    path: '/',
    name:'/',
    redirect: "/admin",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/admin",
    name: "/admin",
    component: Home,
    meta: { requiresAuth: true },
    redirect: { name: "admin-manage" },
    children: [
      {
        path: "admin-manage",
        name: "admin-manage",
        component: mapManage,
        meta: { requiresAuth: true },
      },
      {
        path:'user',
        name:'user',
        component:userMangae,
        meta: { requiresAuth: true }
      },
      {
        path:'order-manage',
        name:'order-manage',
        component:orderManage,
        meta: { requiresAuth: true }
      },{
        path:'statistics',
        name:'statistics',
        component:statisticsManage,
        meta: { requiresAuth: true }
      },
      {
        path: "myInfo",
        name: "myInfo",
        component: MyInfo
      },
      {
        path:"goodsAdminDetail",
        name:"goodsAdminDetail",
        component:goodsDetail,
      },
      {
        path:'stall-manage',
        name:'stall-manage',
        component:stallManage,
      },
      {
        path:'notice-manage',
        name:'notice-manage',
        component:noticeManage,
      },
      {
        path:'area-manage',
        name:'area-manage',
        component:areaManage,
      },
      {
        path:'evaluate-manage',
        name:'evaluate-manage',
        component:evaluateManage,
      }
    ],
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.afterEach((from) => {
  const title = menu.menu.filter((i) => i.index === from.name);
  console.log(title);
  store.commit("setBreadList", title);
});

// 导出路由实例
export default router;