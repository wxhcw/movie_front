<template>
  <h1>管理员首页movie-admin</h1>
  <h1>欢迎您，{{ userinfo.username }}</h1>
</template>

<script>
import getUserInfo from "../hooks/getUserInfo";
export default {
  name: "admin",
  setup() {
    let userinfo = getUserInfo().userinfo;
    return { userinfo };
  },
};
</script>

<style>
</style>