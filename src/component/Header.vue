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
        <div class="logo" title="电影院售票系统">电影院售票系统</div>
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
              <el-dropdown-item command="user/center"
                >个人中心</el-dropdown-item
              >
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
      } else {
        router.push(`/${command}`);
      }
    };

    return {
      collapse,
      collapseChage,
      movname,
      handleCommand,
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
  font-size: 1.3rem;
  color: #fff;
  .header-left {
    width: 45%;
    float: left;
    line-height: 60px;
    .header-left-con {
      display: flex;
      height: 60px;
      align-items: center;
      .collapse-btn {
        padding: 0 1.3rem;
        cursor: pointer;
      }
      .logo {
        width: 30%;
        text-align: center;
        margin-left: 3.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .header-input {
        margin-left: 1rem;
        width: 45%;
      }
    }
  }
  .header-right {
    float: right;
    padding-right: 3.1rem;
    .header-user-con {
      display: flex;
      height: 60px;
      align-items: center;
      .user-avator {
        margin-left: 1.25rem;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .user-name {
        margin-left: 0.625rem;
        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
