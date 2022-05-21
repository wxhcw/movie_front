<template>
  <div class="mgr-info">
    <div class="movie-hall-input">
      <el-input
        v-model="queryName"
        placeholder="Movie"
        @keyup.enter="queryMovName"
        clearable
        @clear="clearFn"
      >
      </el-input>
      <el-input
        v-model="queryType"
        placeholder="Type"
        @keyup.enter="queryMovName"
        clearable
        @clear="clearFn"
      >
      </el-input>
      <el-button type="primary" :icon="Search" @click="queryMovName">
        Search
      </el-button>
      <el-button type="primary" :icon="CirclePlus" @click="insertFlag = true">
        添加电影信息
      </el-button>
    </div>
    <el-table
      :data="dataShow"
      border
      style="width: 100%"
      empty-text="该影院暂无排片信息"
    >
      <el-table-column label="Name" prop="movie_name" show-overflow-tooltip />
      <el-table-column label="Type" prop="movie_type" show-overflow-tooltip />
      <el-table-column
        label="Nation"
        width="120"
        prop="movie_nation"
        show-overflow-tooltip
      />
      <el-table-column
        label="Score"
        width="120"
        prop="movie_score"
        show-overflow-tooltip
      />
      <el-table-column label="Poster" width="80">
        <template #default="{ row }">
          <img v-show="row.movie_poster" :src="row.movie_poster" />
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="updateMovieInfo(scope.row)"
            style="margin: 0 0.625rem"
          >
            更改影片
          </el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="deleteMovieInfo(scope.row, scope.$index)"
          >
            删除影片
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="movie-hall-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total"
      />
    </div>
    <el-dialog title="更改电影信息" v-model="formFlag" width="30%">
      <el-form :model="updateMovieInfoForm" label-width="80px">
        <el-form-item label="Name" prop>
          <el-input v-model="updateMovieInfoForm.value.movie_name"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-input v-model="updateMovieInfoForm.value.movie_type"></el-input>
        </el-form-item>
        <el-form-item label="Nation">
          <el-input v-model="updateMovieInfoForm.value.movie_nation"></el-input>
        </el-form-item>
        <el-form-item label="Score">
          <el-input v-model="updateMovieInfoForm.value.movie_score"></el-input>
        </el-form-item>
        <el-form-item label="Poster" class="info-poster">
          <el-upload
            action="/api/my/update/avatar"
            :show-file-list="false"
            :on-success="handlePosterSuccess"
            :before-upload="beforePosterUpload"
          >
            <img
              v-if="updateMovieInfoForm.value.movie_poster"
              :src="updateMovieInfoForm.value.movie_poster"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="formFlag = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdateMovInfo">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="添加电影信息" v-model="insertFlag" width="30%">
      <el-form :model="InsertMovieInfoForm" label-width="80px">
        <el-form-item label="Name" prop>
          <el-input v-model="InsertMovieInfoForm.movie_name"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-input v-model="InsertMovieInfoForm.movie_type"></el-input>
        </el-form-item>
        <el-form-item label="Nation">
          <el-input v-model="InsertMovieInfoForm.movie_nation"></el-input>
        </el-form-item>
        <el-form-item label="Score">
          <el-input v-model="InsertMovieInfoForm.movie_score"></el-input>
        </el-form-item>
        <el-form-item label="Poster" class="info-poster">
          <el-upload
            action="/api/my/update/avatar"
            :show-file-list="false"
            :on-success="handleInsPosterSuccess"
            :before-upload="beforePosterUpload"
          >
            <img
              v-if="InsertMovieInfoForm.movie_poster"
              :src="InsertMovieInfoForm.movie_poster"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="insertFlag = false">取 消</el-button>
          <el-button type="primary" @click="submitInsertMovInfo">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { updateMovInfo, delMovInfo, insertMovInfo } from "../../server/admin";
import { CirclePlus, Search, Delete, Edit } from "@element-plus/icons-vue";
import { getAllMovieInfoAction } from "../../hooks/getMovieInfo";
import { ElMessage, ElMessageBox } from "element-plus";
import { nanoid } from "nanoid";

export default {
  name: "mgrInfo",
  setup() {
    //获取电影数据
    const movieHandler = reactive({});
    movieHandler.value = getAllMovieInfoAction(5);

    //对话框显示标志
    const formFlag = ref(false);
    const insertFlag = ref(false);

    //表单信息
    const InsertMovieInfoForm = reactive({
      movie_id: nanoid(),
      movie_name: "",
      movie_type: "",
      movie_nation: "",
      movie_score: "",
      movie_poster: "",
    });
    const updateMovieInfoForm = reactive({});

    //提交表单信息
    const submitUpdateMovInfo = () => {
      updateMovInfo(updateMovieInfoForm.value).then((data) => {
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          ElMessage.success(data.message);
        }
      });
      formFlag.value = false; //关闭对话框
    };
    const submitInsertMovInfo = () => {
      insertMovInfo(InsertMovieInfoForm).then((data) => {
        if (data.status) {
          ElMessage.error(data.message);
        } else {
          ElMessage.success(data.message);
        }
      });
      insertFlag.value = false; //关闭对话框
    };

    //处理电影海报
    const handlePosterSuccess = (res, file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        updateMovieInfoForm.value.movie_poster = reader.result;
      };
    };
    const handleInsPosterSuccess = (res, file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        InsertMovieInfoForm.movie_poster = reader.result;
      };
    };
    const beforePosterUpload = (file) => {
      // console.log("file.size: ", file.size / 1024, "KB");
      const isLt80kb = file.size / 1024 < 80;

      if (!isLt80kb) {
        ElMessage.error("上传头像图片大小不能超过 80KB!");
      }
      return isLt80kb;
    };

    //删除电影行基本信息
    const deleteMovieInfo = (row, index) => {
      ElMessageBox.confirm(`确定要删除《${row.movie_name}》吗?`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMovInfo(row.movie_id).then((data) => {
            if (data.status) {
              ElMessage.error(data.message);
            } else {
              movieHandler.value.dataShow.splice(index, 1);
              ElMessage.success(`删除《${row.movie_name}》成功`);
            }
          });
        })
        .catch(() => {
          ElMessage.info('取消删除');
        });
    };

    //更新电影行基本信息
    const updateMovieInfo = (row) => {
      updateMovieInfoForm.value = row;
      formFlag.value = true; //弹出对话框
    };
    return {
      ...toRefs(movieHandler.value),
      updateMovieInfoForm,
      InsertMovieInfoForm,
      updateMovieInfo,
      submitUpdateMovInfo,
      submitInsertMovInfo,
      deleteMovieInfo,
      formFlag,
      insertFlag,
      handlePosterSuccess,
      handleInsPosterSuccess,
      beforePosterUpload,
      CirclePlus,
      Search,
      Delete,
      Edit,
    };
  },
};
</script>

<style lang='less' scoped>
.mgr-info {
  padding-left: 2rem;
  padding-top: 0.625rem;
  .movie-hall-input {
    width: 800px;
    margin-bottom: 1.5rem;
    display: flex;
    .el-input {
      margin-right: 1rem;
    }
  }
  :deep(.el-table__row),
  :deep(.el-table__header) {
    height: 60px;
  }
  .el-table .cell img {
    width: 41px;
    height: 60px;
  }
  .movie-hall-page {
    position: absolute;
    bottom: 2.5rem;
    padding-left: 30rem;
  }
  :deep(.el-upload) {
    width: 150px;
  }

  .info-poster {
    height: 150px;
  }
}
</style>