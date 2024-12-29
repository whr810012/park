const menu = [
  {
    index: "admin-manage",
    title: "管理员管理",
    icon: require('@/menu/管理员.png'),
    iconActive: require('@/menu/管理员(1).png'),
  },
  {
    index: "user",
    title: "用户管理",
    icon: require('@/menu/用户.png'),
    iconActive: require('@/menu/用户(1).png'),
  },
  {
    index:'order-manage',
    title:'订单管理',
    icon:require('@/menu/订单.png'),
    iconActive:require('@/menu/订单(1).png'),
  },
  {
    index:'area-manage',
    title:'区域管理',
    icon:require('@/menu/区域.png'),
    iconActive:require('@/menu/区域(1).png'),
  },
  {
    index:'stall-manage',
    title:'车位管理',
    icon:require('@/menu/停车位.png'),
    iconActive:require('@/menu/停车位(1).png'),
  },
  {
    index:'notice-manage',
    title:'公告管理',
    icon:require('@/menu/公告.png'),
    iconActive:require('@/menu/公告(1).png'),
  },
  {
    index:'evaluate-manage',
    title:'评价管理',
    icon:require('@/menu/评价.png'),
    iconActive:require('@/menu/评价(1).png'),
  }
];

export default {
  menu,
};
