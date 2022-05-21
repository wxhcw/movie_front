<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">电影院售票系统</div>
      <el-form :model="userInfo" label-width="0px" class="ms-content">
        <el-form-item>
          <el-input v-model="userInfo.username" placeholder="username">
            <template #prepend>
              <el-button>
                <el-icon> <user /> </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="password"
            v-model="userInfo.password"
            @keyup.enter="submitLoginForm(isLogin)"
          >
            <template #prepend>
              <el-button>
                <el-icon> <lock /> </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <template v-if="!isLogin">
          <el-form-item>
            <el-input
              type="password"
              placeholder="confirm password"
              v-model="userInfo.confirmPwd"
              @keyup.enter="submitRegForm()"
            >
              <template #prepend>
                <el-button>
                  <el-icon> <lock /> </el-icon>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <div class="login-btn" v-if="!isLogin">
          <el-button type="primary" @click="submitRegForm()">注册</el-button>
        </div>
        <div class="login-btn" v-else>
          <el-button type="primary" @click="submitLoginForm(true)"
            >登录</el-button
          >
        </div>
        <p class="login-tips">
          <router-link active-class="active" to="/user">忘记密码</router-link>
          <router-link
            v-if="!isLogin"
            class="reg-user"
            active-class="active"
            to="/"
            >已有账号？去登录</router-link
          >
          <router-link v-else class="reg-user" active-class="active" to="/reg"
            >还没账号？去注册</router-link
          >
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userReg, userLogin } from "../server/user";
import { nanoid } from "nanoid";

export default {
  name: "login",
  props: ["isLogin"],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    let user = {
      username: "",
      password: "",
    };
    if (!props.isLogin) {
      user.customer_id = nanoid();
      user.confirmPwd = "";
    }
    const userInfo = reactive(user);
    const submitRegForm = () => {
      userReg(userInfo).then((data) => {
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          ElMessage.success(data.message);
          router.push("/");
        }
      });
    };
    const submitLoginForm = (isLoginState) => {
      if (!isLoginState) return false;
      userLogin(userInfo).then((data) => {
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          store.commit("set_token", data.token);
          const msg = data.role ? "管理员登录成功！" : "用户登录成功！";
          const path = data.role ? "/admin" : "/user";
          router.push(path);
          ElMessage.success(msg);
        }
      });
    };
    const getForgetPwd = () => {
      router.push("/user");
    };
    return {
      userInfo,
      submitRegForm,
      submitLoginForm,
      getForgetPwd,
    };
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.4);
    overflow: hidden;
    .ms-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #888;
      border-bottom: 1px solid #aaa;
    }
    .ms-content {
      padding: 30px 30px;
      .login-btn button {
        text-align: center;
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
      }
      .login-tips {
        font-size: 12px;
        line-height: 30px;
        a {
          color: #999;
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: #ededed;
          }
        }
        .reg-user {
          float: right;
        }
      }
    }
  }
}
</style>