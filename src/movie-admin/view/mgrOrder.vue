<template>
  <div class="mgr-order">
    <div class="movie-hall-input">
      <el-input
        v-model="queryUsername"
        placeholder="Username"
        @keyup.enter="queryMovName"
        clearable
        @clear="clearFn"
      >
      </el-input>
      <el-input
        v-model="queryName"
        placeholder="Movie"
        @keyup.enter="queryMovName"
        clearable
        @clear="clearFn"
      >
      </el-input>
      <el-input
        v-model="queryHall"
        placeholder="Hall number"
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
      <el-table-column
        label="Username"
        width="120"
        prop="username"
        show-overflow-tooltip
      />
      <el-table-column label="Name" prop="movie_name" show-overflow-tooltip />
      <el-table-column label="Count" width="80" prop="count" />
      <el-table-column label="Price" width="100">
        <template #default="{ row }"> ￥{{ row.total_price }} </template>
      </el-table-column>
      <el-table-column
        label="Order time"
        width="160"
        prop="order_time"
        sortable
        show-overflow-tooltip
      />
      <el-table-column label="Hall" width="120">
        <template #default="{ row }"> {{ row.schedule_hall }}号大厅 </template>
      </el-table-column>
      <el-table-column label="Release date" width="160" prop="movie_time" sortable/>
      <el-table-column label="Poster" width="80">
        <template #default="{ row }">
          <img v-show="row.movie_poster" :src="row.movie_poster" />
        </template>
      </el-table-column>
      <el-table-column label="Operations" width="150">
        <template #default="{ row }">
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            style="margin-right: 1.2rem"
            @click="deleteOrder(row)"
          >
            删除订单
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
import { getAllOrderInfoAction } from "../../hooks/getUserInfo";
import { Delete, Search } from "@element-plus/icons-vue";
export default {
  name: "mgrOrder",
  setup() {
    const orderHandler = reactive({});
    orderHandler.value = getAllOrderInfoAction(5);
    return { Delete, Search, ...toRefs(orderHandler.value) };
  },
};
</script>

<style lang='less' scoped>
.mgr-order {
  padding: 1.5rem 1.125rem 0;
  .movie-hall-input {
    margin-bottom: 1.5rem;
    display: flex;
    width: 1200px;
    :deep(.el-input) {
      width: 220px;
      margin-right: 0.625rem;
    }
    :deep(.el-date-editor) {
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
    padding-left: 35rem;
  }
}
</style>