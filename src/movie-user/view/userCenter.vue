<template>
  <Sidebar />
  <div class="content-box">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "../component/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>

<style>
</style>