<template>
  <h1>用户首页movie-user</h1>
  <h1>欢迎您，{{ userinfo.username }}</h1>
</template>

<script>
import getUserInfo from "../hooks/getUserInfo";
export default {
  name: "user",
  setup() {
    let userinfo = getUserInfo().userinfo;
    return { userinfo };
  },
};
</script>

<style>
</style>