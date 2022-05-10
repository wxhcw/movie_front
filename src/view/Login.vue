<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">电影院售票系统</div>
      <el-form :model="userInfo" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" placeholder="username">
            <template #prepend>
              <el-button>
                <el-icon> <user /> </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="userInfo.password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button>
                <el-icon> <lock /> </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">
          <a @click="getForgetPwd">忘记密码</a>
          <router-link class="reg-user" active-class="active" to="/admin"
            >还没账号？去注册</router-link
          >
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userLoginAction } from "../components/interface";

export default {
  name: "login",
  setup() {
    const router = useRouter();
    const userInfo = reactive({
      username: "admin",
      password: "123123",
    });

    const submitForm = () => {
      userLoginAction(userInfo).then((data) => {
        console.log(data);
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          // ElMessage.success(data.message);
          // console.log(router);
          router.push("/user");
        }
      });
    };
    const getForgetPwd = () => {
      router.push("/user");
    };
    return {
      userInfo,
      submitForm,
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
            color: #aaa;
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