<template>
  <div class="user-collect">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      empty-text="暂无收藏的场次信息"
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
        <template #default="scope">
          <router-link :to="`/user/center/${scope.row.movie_id}/${scope.row.schedule_id}`">
            <el-button size="small" type="danger" :icon="Ticket" style="margin-right: 1.2rem">
              购票
            </el-button>
          </router-link>
          <el-button
            size="small"
            :icon="Collection"
            type="success"
            style="width: 90px"
            @click="upCollect(scope.row, scope.$index)"
          >
            取消收藏
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { Ticket, Collection } from "@element-plus/icons-vue";
import { getCollectSchedule } from "../../server/movie";
import { updateIsCollect } from "../../hooks/getMovieInfo";
export default {
  name: "userCollect",
  setup() {
    const dataShow = reactive({ tableData: [] });
    const initData = () => {
      getCollectSchedule().then((res) => {
        dataShow.tableData = res.data;
      });
    };
    const upCollect = (row, index) => {
      updateIsCollect(row);
      dataShow.tableData.splice(index, 1);
    };
    onMounted(() => {
      initData();
    });
    return { ...toRefs(dataShow), Ticket, Collection, upCollect };
  },
};
</script>

<style scoped>
.user-collect {
  padding: 2rem 1.125rem 0;
}
:deep(.el-table__row),
:deep(.el-table__header) {
  height: 60px;
}
</style>