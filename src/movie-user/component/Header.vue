<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-con">
        <div class="logo" title="电影院售票系统">电影院售票系统</div>
      </div>
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <!-- <template v-if="userinfo.avatar"> -->
          <img v-if="userinfo.avatar" :src="userinfo.avatar" />
          <img v-else src="../../assets/img/img.jpg" />
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
import { useRouter } from "vue-router";
export default {
  props: ["userinfo", "isAdmin"],
  setup() {
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
    float: left;
    line-height: 60px;
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
