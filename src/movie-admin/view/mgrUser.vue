<template>
  <div class="mgr-user">
    <div class="movie-hall-input">
      <el-input
        v-model="queryUsername"
        placeholder="Username"
        @keyup.enter="queryMovName"
        clearable
        @clear="clearFn"
      >
      </el-input>
      <el-button type="primary" :icon="Search" @click="queryMovName">
        Search
      </el-button>
    </div>
    <el-table
      :data="dataShow"
      border
      style="width: 100%"
      empty-text="该影院暂无排片信息"
    >
      <el-table-column label="Username" prop="username" show-overflow-tooltip />
      <el-table-column label="Email" prop="email" show-overflow-tooltip />
      <el-table-column label="Motto" prop="motto" show-overflow-tooltip />
      <el-table-column label="IsAdmin" prop="isAdmin" width="90" />
      <el-table-column label="Avatar" width="80">
        <template #default="{ row }">
          <img v-if="row.avatar" :src="row.avatar" />
          <img v-else src="../../assets/img/img.jpg" />
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="{ row }">
          <el-button
            size="small"
            type="danger"
            :icon="Refresh"
            style="margin: 0 0.625rem"
            @click="deleteOrder(row)"
          >
            重置密码
          </el-button>
          <el-button
            size="small"
            type="primary"
            v-if="!row.isAdmin"
            :icon="UserFilled"
            @click="changeAdmin(row)"
          >
            设为管理员
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
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { getAllUserInfoAction } from "../../hooks/getUserInfo";
import { UserFilled, Refresh, Search } from "@element-plus/icons-vue";
export default {
  name: "mgrUser",
  setup() {
    const userHandler = reactive({});
    userHandler.value = getAllUserInfoAction(5);
    return { UserFilled, Search, Refresh, ...toRefs(userHandler.value) };
  },
};
</script>

<style lang='less' scoped>
.mgr-user {
  padding: 1.5rem 1.125rem 0;
  .movie-hall-input {
    margin-bottom: 1.5rem;
    display: flex;
    width: 400px;
    :deep(.el-input) {
      width: 220px;
      margin-right: 0.625rem;
    }
    :deep(.el-date-editor) {
      margin-right: 1rem;
    }
  }
  :deep(.el-table__header),
  :deep(.el-table__row) {
    height: 60px;
  }

  .el-table .cell img {
    width: 41px;
    height: 60px;
  }
  .movie-hall-page {
    position: absolute;
    bottom: 2.5rem;
    padding-left: 35rem;
  }
}
</style>