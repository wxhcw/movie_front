<template>
  <div class="avatar-uploader">
    <p>更换头像</p>
    <el-upload
      action="/api/my/update/avatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <button @click="submitAvatar">确定上传</button>
  </div>
</template>
<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { updateAvatar } from "../../server/user";
export default {
  name: "userSetting",
  setup() {
    const imageUrl = ref("");

    const handleAvatarSuccess = (res, file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        imageUrl.value = reader.result;
      };
    };

    const beforeAvatarUpload = (file) => {
      console.log("file.size: ", file.size / 1024, "KB");
      const isLt80kb = file.size / 1024 < 80;

      if (!isLt80kb) {
        ElMessage.error("上传头像图片大小不能超过 80KB!");
      }
      //   return isJPG && isLt2M;
      return isLt80kb;
    };

    const submitAvatar = () => {
      updateAvatar(imageUrl.value).then((data) => {
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          ElMessage.success("success!");
        }
      });
    };
    return {
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload,
      submitAvatar,
    };
  },
};
</script>
<style lang='less' scoped>
.avatar-uploader {
  :deep(.el-upload) {
    width: 178px;
    height: 178px;
    border-radius: 50%;
    border: 1px dashed #ccc;
  }
}
</style>