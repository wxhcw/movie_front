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
      <el-input
        v-model="queryHall"
        placeholder="Hall number"
        @keyup.enter="queryMovName"
        clearable
        @clear="clearFn"
      >
      </el-input>
      <el-date-picker
        v-model="queryDate"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="YYYY/MM/DD hh:mm"
      />
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
      <el-table-column label="Release date" width="200" prop="movie_time" sortable/>
      <el-table-column label="Operations">
        <template #default="{ row }">
          <!-- <router-link :to="`/user/center/${row.movie_id}/${row.schedule_id}`"> -->
          <el-button
            size="small"
            type="danger"
            :icon="Ticket"
            style="margin-right: 1.2rem"
            @click="buyTicket(row)"
          >
            购票
          </el-button>
          <!-- </router-link> -->
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
import { reactive, toRefs, inject } from "vue";
import { updateIsCollect, getScheduleAction } from "../../hooks/getMovieInfo";
import { buyTicketAction } from "../../hooks/getUserInfo";
import { Collection, Ticket, Search } from "@element-plus/icons-vue";
export default {
  name: "userHall",
  setup() {
    //获取排片信息
    const scheduleHandler = reactive({});
    scheduleHandler.value = getScheduleAction(7);
    const user = inject("user"); //获取用户ID
    const buyTicket = (row) => {
      buyTicketAction(row, user.userinfo.customer_id);
    };
    return {
      ...toRefs(scheduleHandler.value),
      buyTicket,
      updateIsCollect,
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
  .movie-hall-page {
    position: absolute;
    bottom: 2.5rem;
    padding-left: 35rem;
  }
}
</style>