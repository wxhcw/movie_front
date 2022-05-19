<template>
  <el-table
    :data="schedule"
    style="width: 100%"
    empty-text="该电影暂无排片信息"
  >
    <el-table-column label="Date" width="250" prop="movie_time" />
    <el-table-column label="Hall" width="180">
      <template #default="{ row }"> {{ row.schedule_hall }}号大厅 </template>
    </el-table-column>
    <el-table-column label="Price" width="180">
      <template #default="{ row }"> ￥{{ row.price }} </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="{ row }">
         <router-link :to="`/user/center/${row.movie_id}/${row.schedule_id}`">
            <el-button
              size="small"
              type="danger"
              :icon="Ticket"
              style="width: 80px"
            >
              购票
            </el-button>
          </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Ticket } from "@element-plus/icons-vue";
export default {
  name: "userMovieTable",
  props: ["schedule"],
  setup() {
    const handleEdit = (index, row) => {
      console.log(index, row);
    };
    const buyTicket = (row) => {
      console.log(row);
    };
    return { handleEdit, buyTicket, Ticket };
  },
};
</script>
