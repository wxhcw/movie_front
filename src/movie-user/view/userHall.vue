<template>
  <div class="user-hall">
    <div class="movie-hall-input">
      <el-input
        v-model="queryName"
        placeholder="Movie"
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
      :data="tableData"
      border
      style="width: 100%"
      empty-text="该影院暂无排片信息"
    >
      <el-table-column
        label="Name"
        width="300"
        prop="movie_name"
        show-overflow-tooltip
      />
      <el-table-column
        label="Type"
        width="180"
        prop="movie_type"
        show-overflow-tooltip
      />
      <el-table-column
        label="Nation"
        width="100"
        prop="movie_nation"
        show-overflow-tooltip
      />
      <el-table-column
        label="Score"
        width="100"
        prop="movie_score"
        show-overflow-tooltip
      />
      <el-table-column label="Hall" width="120">
        <template #default="{ row }"> {{ row.schedule_hall }}号大厅 </template>
      </el-table-column>
      <el-table-column label="Price" width="100">
        <template #default="{ row }"> ￥{{ row.price }} </template>
      </el-table-column>
      <el-table-column label="Date" width="200" prop="movie_time" />
      <el-table-column label="Operations">
        <template #default="{ row }">
          <router-link :to="`/user/center/buy/ticket/${row.schedule_id}`">
            <el-button
              size="small"
              type="danger"
              :icon="Ticket"
              style="margin-right: 1.2rem"
            >
              购票
            </el-button>
          </router-link>
          <el-button
            size="small"
            :icon="Collection"
            :type="row.schedule_isCollect ? 'success' : 'primary'"
            style="width: 90px"
            @click="updateIsCollect(row)"
          >
            {{ row.schedule_isCollect ? "取消收藏" : "收藏场次" }}
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
import { onMounted, reactive, ref, toRefs } from "vue";
import { getHallSchedule, updateCollect } from "../../server/movie";
import { Collection, Ticket, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
export default {
  name: "userHall",
  setup() {
    const page = reactive({
      queryName: "",
      currentPage: 1,
      pageSize: 7,
    });
    let total = ref(0);
    const dataShow = reactive({ tableData: [] });

    const handleCurrentChange = (val) => {
      page.currentPage = val;
      initData();
    };
    const queryMovName = () => {
      initData();
    };
    const clearFn = () => {
      initData();
    };
    const initData = () => {
      getHallSchedule(page).then((res) => {
        dataShow.tableData = res.data.results;
        total.value = res.data.totalCount;
      });
    };
    onMounted(() => {
      initData();
    });

    const updateIsCollect = (row) => {
      console.log(row.schedule_isCollect);
      console.log(row.movie_id);
      row.schedule_isCollect = !row.schedule_isCollect;

      updateCollect({
        isCollect: row.schedule_isCollect,
        movieId: row.movie_id,
      }).then((res) => {
        if (res.status) {
          ElMessage.error(res.message);
        } else {
          ElMessage.success(res.message);
        }
      });
    };
    return {
      handleCurrentChange,
      queryMovName,
      clearFn,
      updateIsCollect,
      ...toRefs(dataShow),
      total,
      ...toRefs(page),
      Collection,
      Ticket,
      Search,
    };
  },
};
</script>

<style lang='less' scoped>
.user-hall {
  padding: 1.5rem 1.125rem 0;
  .movie-hall-input {
    width: 500px;
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
  .movie-hall-page {
    position: absolute;
    bottom: 2.5rem;
    padding-left: 35rem;
  }
}
</style>