<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#efefef"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.index">
              <el-menu-item :index="subItem.index">
                <el-icon><component :is="subItem.icon" /></el-icon>
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon><component :is="item.icon" /></el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const items = [
      {
        icon: "User",
        index: "./mgrUser",
        title: "用户管理",
      },
      {
        icon: "VideoCamera",
        index: "2",
        title: "电影管理",
        subs: [
          {
            index: "/admin/mgrInfo",
            title: "基本信息",
            icon: "InfoFilled",
          },
          {
            index: "/admin/mgrDetail",
            title: "详细信息",
            icon: "DocumentCopy",
          },
        ],
      },
      {
        icon: "Timer",
        index: "./mgrSchedule",
        title: "排片管理",
      },
      {
        icon: "School",
        index: "./mgrHall",
        title: "影厅管理",
      },
      {
        icon: "Tickets",
        index: "./mgrOrder",
        title: "订单管理",
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
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
  width: 185px;
}
.sidebar > ul {
  height: 100%;
}
</style>
