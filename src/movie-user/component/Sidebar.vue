<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#efefef"
      active-text-color="#20a0ff"
      router
    >
      <template v-for="item in items" :key="item.index">
        <el-menu-item :index="item.index">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  setup() {
    const items = [
      {
        icon: "Setting",
        index: "./settings",
        title: "个人设置",
      },
      {
        icon: "Star",
        index: "./collect",
        title: "我的收藏",
      },
      {
        icon: "Tickets",
        index: "./order",
        title: "我的订单",
      },
      {
        icon: "InfoFilled",
        index: "./movName",
        title: "电影信息",
      },
      {
        icon: "Ticket",
        index: "./movHall",
        title: "影院购票",
      },
    ];

    return {
      items,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  background-color: rgba(105, 164, 216, 0.4);
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}
.sidebar > ul {
  height: 100%;
}
</style>
