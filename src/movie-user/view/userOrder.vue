<template>
  <p>{{ orderinfo }}</p>
</template>

<script>
import { inject, onMounted, reactive, toRefs } from "vue";
import { getOrderInfo } from "../../server/user";
import { ElMessage } from "element-plus";
export default {
  name: "userOrder",
  setup() {
    let order = reactive({
      orderinfo: {},
    });
    
    onMounted(() => {
      const user = inject("user"); //获取用户ID
      getOrderInfo(user.userinfo.customer_id).then((res) => {
        if (res.status) {
          ElMessage.error(res.message);
        } else {
          order.orderinfo = res.data;
        }
      });
    });
    return { ...toRefs(order) };
  },
};
</script>

<style>
</style>