<template>
  <div class="user-index">
    <Header :userinfo="user.userinfo" :isAdmin="false" />
    <router-view></router-view>
  </div>
</template>

<script>
import getUserInfo from "../hooks/getUserInfo";
import Header from "./component/Header.vue";
export default {
  name: "user",
  components: {
    Header,
  },
  setup() {
    let user = getUserInfo();
    return { user };
  },
};
</script>

<style scoped>
.user-index {
  min-width: 680px;
  overflow: auto;
  height: 100%;
}
</style>
