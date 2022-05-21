<template>
  <div class="mgr-schedule">
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
      <el-button type="primary" :icon="CirclePlus" @click="insertFlag = true">
        添加排片信息
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
        width="90"
        prop="movie_nation"
        show-overflow-tooltip
      />
      <el-table-column
        label="Score"
        width="80"
        prop="movie_score"
        show-overflow-tooltip
      />
      <el-table-column label="Hall" width="100">
        <template #default="{ row }"> {{ row.schedule_hall }}号大厅 </template>
      </el-table-column>
      <el-table-column label="Price" width="80">
        <template #default="{ row }"> ￥{{ row.price }} </template>
      </el-table-column>
      <el-table-column label="Release date" prop="movie_time" sortable/>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="updateSchechleInfo(scope.row)"
            style="margin: 0 0.625rem"
          >
            修改排片
          </el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="deleteSchechleInfo(scope.row, scope.$index)"
          >
            取消排片
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
import {
  CirclePlus,
  Search,
  Delete,
  Edit,
  Calendar,
} from "@element-plus/icons-vue";
import { getScheduleAction } from "../../hooks/getMovieInfo";
export default {
  name: "mgrSchedule",
  setup() {
    //获取排片数据
    const scheduleHandler = reactive({});
    scheduleHandler.value = getScheduleAction(8);
    //表单信息
    return {
      ...toRefs(scheduleHandler.value),
      CirclePlus,
      Search,
      Delete,
      Edit,
      Calendar,
    };
  },
};
</script>

<style lang='less' scoped>
.mgr-schedule {
  padding-left: 1rem;
  padding-top: 0.625rem;
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
    height: 54px;
  }
  .movie-hall-page {
    position: absolute;
    bottom: 2.5rem;
    padding-left: 35rem;
  }
}
</style>