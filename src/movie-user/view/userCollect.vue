<template>
  <div class="user-collect">
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
              style="width: 90px"
            >
              购票
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { Ticket } from "@element-plus/icons-vue";
import { getCollectSchedule } from "../../server/movie";
export default {
  name: "userCollect",
  setup() {
    const dataShow = reactive({ tableData: [] });
    const initData = () => {
      getCollectSchedule().then((res) => {
        dataShow.tableData = res.data;
      });
    };
    onMounted(() => {
      initData();
    });
    return { ...toRefs(dataShow), Ticket };
  },
};
</script>

<style scoped>
.user-collect {
  padding: 2rem;
}
:deep(.el-table__row),
:deep(.el-table__header) {
  height: 60px;
}
</style>