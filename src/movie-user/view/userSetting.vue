<template>
  <div class="user-settings">
    <el-container>
      <div class="user-settings-main">
        <h2>个人资料</h2>
        <el-form
          label-width="100px"
          :model="formUserUpdate"
          style="max-width: 460px"
        >
          <el-divider />
          <el-form-item label="用户名">
            <el-input
              :placeholder="userinfo.username"
              v-model="formUserUpdate.username"
            />
          </el-form-item>
          <el-divider />
          <el-form-item label="邮箱">
            <el-input
              :placeholder="userinfo.email"
              v-model="formUserUpdate.email"
            />
          </el-form-item>
          <el-divider />
          <el-form-item label="个人介绍">
            <el-input
              :placeholder="userinfo.motto"
              v-model="formUserUpdate.motto"
            />
          </el-form-item>
          <el-divider />
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="user-settings-aside">
        <el-aside width="200px">
          <div class="avatar-uploader">
            <el-upload
              action="/api/my/update/avatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <img v-else :src="userinfo.avatar" class="avatar" />
              <!-- <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
            </el-upload>
            <p>我的头像</p>
            <!-- <button @click="submitAvatar">确定上传</button> -->
          </div>
        </el-aside>
      </div>
    </el-container>
  </div>
</template>
<script>
import { inject, reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { updateUserInfo } from "../../server/user";
export default {
  name: "userSetting",
  setup() {
    const imageUrl = ref("");
    const formUserUpdate = reactive({
      customer_id: "",
      username: "",
      email: "",
      motto: "",
      avatar: "",
    });
    const user = inject("user");
    const handleAvatarSuccess = (res, file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        imageUrl.value = reader.result;
      };
    };

    const beforeAvatarUpload = (file) => {
      // console.log("file.size: ", file.size / 1024, "KB");
      const isLt80kb = file.size / 1024 < 80;

      if (!isLt80kb) {
        ElMessage.error("上传头像图片大小不能超过 80KB!");
      }
      return isLt80kb;
    };

    const onSubmit = () => {
      formUserUpdate.customer_id = user.userinfo.customer_id;
      formUserUpdate.avatar = imageUrl.value;
      updateUserInfo(formUserUpdate).then((data) => {
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          ElMessage.success(data.message);
        }
      });
    };
    return {
      imageUrl,
      formUserUpdate,
      ...toRefs(user),
      onSubmit,
      handleAvatarSuccess,
      beforeAvatarUpload,
    };
  },
};
</script>
<style lang='less' scoped>
.user-settings {
  color: var(--el-text-color-regular);
  .el-container {
    padding-top: 3rem;
    .user-settings-main {
      width: 550px;
      margin-left: 4rem;
    }
  }

  .avatar-uploader {
    text-align: center;
    margin-top: 3rem;
    :deep(.el-upload) {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 1px dashed #ccc;
      margin-bottom: 0.625rem;
    }
    .avatar {
      width: 120px;
      height: 120px;
    }
  }
}
</style>