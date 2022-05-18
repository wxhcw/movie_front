<template>
  <div class="movie-hall">
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
    <div v-if="dataShow.length === 0">
      <h3>没有关于'{{ queryName }}'查无此内容</h3>
    </div>
    <div
      v-else
      class="movie-hall-info"
      v-for="item in dataShow"
      :key="item.movie_id"
    >
      <router-link :to="`/user/center/${item.movie_id}`">
        <div class="movie-box">
          <el-image :src="item.movie_poster" lazy />
          <div class="movie-bottom">
            <div class="movie-box-name" :title="item.movie_name">
              {{ item.movie_name }}
            </div>
            <div :title="item.movie_score * 2" class="movie-box-score">
              <el-rate
                v-model="item.movie_score"
                :colors="['#99A9BF', '#F7BA2A', '#f76a1e']"
                disabled
                text-color="#ff9900"
              />
              <span class="score-num">{{ item.movie_score * 2 }}</span>
              <!-- <el-rate v-model="item.score" allow-half />{{ item.score }} -->
            </div>
          </div>
        </div>
      </router-link>
    </div>
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
import { Search } from "@element-plus/icons-vue";
import { getHallMovie } from "../../server/movie";
export default {
  name: "userMovie",
  setup() {
    let total = ref(0);
    const dataShow = ref({});
    const page = reactive({
      queryName: "",
      currentPage: 1,
      pageSize: 14,
    });
    const handleCurrentChange = (val) => {
      page.currentPage = val;
      initData();
    };
    const initData = () => {
      getHallMovie(page).then((res) => {
        res.data.results.forEach((item) => {
          item.movie_score /= 2;
        });
        dataShow.value = res.data.results;
        total.value = res.data.totalCount;
      });
    };
    onMounted(() => {
      initData();
    });
    const queryMovName = () => {
      initData();
    };
    const clearFn = () => {
      initData();
    };
    return {
      queryMovName,
      handleCurrentChange,
      clearFn,
      Search,
      ...toRefs(page),
      dataShow,
      total,
    };
  },
};
</script>

<style lang='less' scoped>
.movie-hall {
  padding-left: 2rem;
  padding-top: 0.625rem;
  .movie-hall-input {
    width: 500px;
    margin-bottom: 2rem;
    display: flex;
    .el-input {
      margin-right: 1rem;
    }
  }
  .movie-hall-info {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    .movie-box {
      color: #232323;
      box-sizing: border-box;
      width: 180px;
      padding-right: 2.875rem;
      padding-bottom: 2.375rem;
      .el-image {
        width: 100%;
        height: 170px;
      }
      :deep(.el-rate) {
        --el-rate-icon-margin: 0;
        margin-right: 0.625rem;
      }
      .movie-box-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .movie-box-score {
        color: #696969;
      }
    }
  }
  .movie-hall-page {
    position: absolute;
    bottom: 2rem;
    padding-left: 35rem;
  }
}
</style>