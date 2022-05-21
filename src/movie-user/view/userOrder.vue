<template>
  <div class="user-order">
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
      <el-table-column label="Name" prop="movie_name" show-overflow-tooltip />
      <el-table-column label="Count" width="80" prop="count" />
      <el-table-column label="Price" width="100">
        <template #default="{ row }"> ￥{{ row.total_price }} </template>
      </el-table-column>
      <el-table-column
        label="Order time"
        prop="order_time"
        sortable 
        show-overflow-tooltip
      />
      <el-table-column label="Hall" width="120">
        <template #default="{ row }"> {{ row.schedule_hall }}号大厅 </template>
      </el-table-column>
      <el-table-column label="Release date" prop="movie_time" sortable/>
      <el-table-column label="Poster" width="80">
        <template #default="{ row }">
          <img v-show="row.movie_poster" :src="row.movie_poster" />
        </template>
      </el-table-column>
      <el-table-column label="Operations" width="150">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="deleteOrder(scope.row, scope.$index)"
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
import { getOrderInfoAction } from "../../hooks/getUserInfo";
import { delOrderInfo } from "../../server/user";
import { Delete, Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  name: "userOrder",
  setup() {
    const orderHandler = reactive({});
    orderHandler.value = getOrderInfoAction(5, "0heqyEDI4sYczyHy68sJr");

    const deleteOrder = (row, index) => {
      ElMessageBox.confirm(`确定要删除《${row.movie_name}》吗?`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delOrderInfo(row.order_id).then((data) => {
            if (data.status) {
              ElMessage.error(data.message);
            } else {
              orderHandler.value.dataShow.splice(index, 1);
              ElMessage.success('订单删除成功');
            }
          });
        })
        .catch(() => {
          ElMessage.info("取消删除");
        });
    };
    return { Delete, Search, deleteOrder, ...toRefs(orderHandler.value) };
  },
};
</script>

<style lang='less' scoped>
.user-order {
  padding: 1.5rem 1.125rem 0;
  .movie-hall-input {
    margin-bottom: 1.5rem;
    display: flex;
    width: 800px;
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