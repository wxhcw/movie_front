<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-con">
        <!-- 折叠按钮 -->
        <div v-show="isAdmin" class="collapse-btn" @click="collapseChage">
          <el-icon v-if="!collapse" :size="30"> <fold /> </el-icon>
          <el-icon v-else :size="30"> <expand /> </el-icon>
        </div>
        <div class="logo" title="电影院售票系统">
          {{ isAdmin ? "电影院售票管理系统" : "电影院售票系统" }}
        </div>
      </div>
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img v-if="userinfo.avatar" :src="userinfo.avatar" />
          <img v-else src="../assets/img/img.jpg" />
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
              <el-dropdown-item v-if="!isAdmin" command="user/center">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item divided command="loginout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus/lib/components";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
export default {
  props: ["userinfo", "isAdmin"],
  setup() {
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
        ElMessageBox.confirm(`确定要退出吗?`, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          localStorage.removeItem("Authorization");
          ElMessage.success("退出成功！");
          router.push("/");
        });
      } else {
        router.push(`/${command}`);
      }
    };

    return {
      handleCommand,
      collapse,
      collapseChage,
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
    float: left;
    line-height: 60px;
    .header-left-con {
      display: flex;
      .collapse-btn {
        box-sizing: border-box;
        float: left;
        height: 60px;
        padding-top: 0.5rem;
        padding-left: 1.3125rem;
        cursor: pointer;
        line-height: 60px;
      }
    }
    .logo {
      width: 250px;
      margin-left: 1.325rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
