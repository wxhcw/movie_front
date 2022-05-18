<template>
  <div class="movie-detail">
    <div class="movie-detail-header">
      <div class="movie-header-top">
        <el-image :src="priMovie.movie_poster" lazy />
        <div class="primary-info">
          <p>{{ priMovie.movie_name }}</p>
          <p>猫眼观众评分</p>
          <p>
            <span class="primary-info-score">{{ priMovie.movie_score }}</span
            >(3.1万人评)
          </p>
          <p>{{ priMovie.movie_type }}</p>
          <p>{{ priMovie.movie_nation }} / {{ detail.runtime }}</p>
          <p>{{ detail.release }}大陆上映</p>
        </div>
      </div>
      <div class="movie-header-bottom">
        <el-button
          :icon="Collection"
          :type="priMovie.movie_isCollect ? 'primary' : ''"
        >
          {{ priMovie.movie_isCollect ? "取消收藏" : "收藏电影" }}
        </el-button>
        <el-button :icon="Star">我要评分</el-button>
      </div>
    </div>
    <userMovTable :schedule="schedule" />
  </div>
</template>

<script>
import { toRefs } from "vue";
import userMovTable from "./userMovTable.vue";
import { Collection, Star } from "@element-plus/icons-vue";
import {
  getMovieDetail,
  getPrimaryAndSchedule,
} from "../../hooks/getMovieInfo";
export default {
  name: "userMovDetail",
  components: {
    userMovTable,
  },
  setup() {
    const movie = getMovieDetail(); //isEmpty、detail
    const mov = getPrimaryAndSchedule(); //priMovie、schedule
    return { ...toRefs(movie), ...toRefs(mov), Collection, Star };
  },
};
</script>

<style lang='less' scoped>
.movie-detail {
  .movie-detail-header {
    width: 100%;
    box-sizing: border-box;
    padding-top: 1rem;
    padding-left: 1rem;
    margin-bottom: 2rem;
    font-size: 1rem;
    color: rgb(51, 62, 72);
    // background-color: rgba(20, 21, 22, 0.4);
    .movie-header-top {
      display: inline-flex;
      flex-wrap: nowrap;
      .el-image {
        width: 150px;
        height: 210px;
      }

      .primary-info {
        text-align: left;
        margin-left: 2rem;
        p {
          margin-bottom: 0.9rem;
          .primary-info-score {
            font-size: 1.5rem;
            margin-right: 0.5rem;
          }
        }
      }
    }
    .movie-header-bottom {
      margin-top: 0.625rem;
      padding-bottom: 1.5rem;
      .el-button {
        width: 150px;
      }
    }
  }
}
</style>