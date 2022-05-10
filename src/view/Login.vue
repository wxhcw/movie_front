<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="userInfo"
        :rules="rules"
        label-width="0px"
        class="ms-content"
      >
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
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userLoginAction } from "../components/interface";

export default {
  setup() {
    const router = useRouter();
    const userInfo = reactive({
      username: "admin",
      password: "123123",
    });
    const error = "waibu err";
    const rules = reactive({
      username: [
        { required: true, message: "Please input username", trigger: "blur" },
      ],
      password: [{ required: true, message: error, trigger: "blur" }],
    });

    const submitForm = () => {
      userLoginAction(userInfo).then((data) => {
        console.log(data);
        router.push({ path: "./Login.vue" });
      });
    };

    return {
      userInfo,
      rules,
      submitForm,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #888;
  border-bottom: 1px solid #aaa;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>