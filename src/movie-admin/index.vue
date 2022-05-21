<template>
  <div class="admin-index">
    <Header :userinfo="user.userinfo" :isAdmin="true" />
    <Sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoAction } from "../hooks/getUserInfo";
import Header from "../component/Header.vue";
import Sidebar from "./component/Sidebar.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "admin",
  components: {
    Header,
    Sidebar,
  },
  setup() {
    let user = getUserInfoAction();

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return { user, collapse };
  },
};
</script>

<style scoped>
.admin-index {
  min-width: 680px;
  overflow: auto;
  height: 100%;
}
.content-box {
  left: 185px;
}
.content-collapse {
  left: 65px;
}
</style>