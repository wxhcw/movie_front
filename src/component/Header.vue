<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-con">
        <!-- 折叠按钮 -->
        <template v-if="isAdmin">
          <div class="collapse-btn" @click="collapseChage">
            <el-icon v-if="!collapse"> <fold /> </el-icon>
            <el-icon v-else> <expand /> </el-icon>
          </div>
        </template>
        <div class="logo">电影院售票系统</div>
        <el-input v-model="movname" class="header-input" placeholder="Movie">
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <!-- <template v-if="userinfo.user_pic"> -->
          <img v-if="userinfo.user_pic" :src="userinfo.user_pic" />
          <img v-else src="../assets/img/img.jpg" />
          <!-- </template>
          <template v-else>
            <img src= />
          </template> -->
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userinfo.username }}
            <el-icon> <caretBottom /> </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">首页</el-dropdown-item>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["userinfo", "isAdmin"],
  setup() {
    const movname = ref("");
    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    // 侧边栏折叠
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });

    // 用户名下拉菜单选择事件
    const router = useRouter();
    const handleCommand = (command) => {
      if (command == "loginout") {
        localStorage.removeItem("token");
        router.push("/");
      } else if (command == "user") {
        router.push("/user");
      }
    };

    return {
      collapse,
      collapseChage,
      handleCommand,
      movname,
    };
  },
};
</script>
<style lang='less' scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  color: #fff;
  .header-left {
    float: left;
    line-height: 60px;
    .header-left-con {
      display: flex;
      height: 60px;
      align-items: center;
      .collapse-btn {
        padding: 0 21px;
        cursor: pointer;
      }
      .logo {
        width: 250px;
        text-align: center;
      }
      .header-input {
        width: 200px;
      }
    }
  }
  .header-right {
    float: right;
    padding-right: 50px;
    .header-user-con {
      display: flex;
      height: 60px;
      align-items: center;
      .user-avator {
        margin-left: 20px;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .user-name {
        margin-left: 10px;
        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
