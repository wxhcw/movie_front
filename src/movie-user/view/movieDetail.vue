<template>
  <div class="error" v-if="isEmpty">
    <p>抱歉，暂无《{{ detail.name }}》的详情信息！</p>
  </div>
  <div v-else class="movie-detail">
    <div class="movie-detail-img">
      <el-image :src="detail.poster" lazy />
    </div>
    <div class="primary-info">
      <div class="detail-left">
        <div class="title-wrap">
          <h1 class="title">{{ detail.name }}</h1>
          <div class="meta fw300">
            <span>{{ detail.rated }}</span> |
            <span>{{ detail.runtime }}</span> |
            <span>{{ detail.release }}</span>
          </div>
        </div>
        <div class="movie-info">
          <div class="summary">{{ detail.introduce }}</div>
          <div class="info-brief">
            <p>
              <span class="fbold">Directed By:</span
              ><span class="fw300">{{ detail.director }}</span>
            </p>
            <p v-if="detail.runtime">
              <span class="fbold">Running Time:</span
              ><span class="fw300">{{ detail.runtime }}</span>
            </p>
            <p>
              <span class="fbold">Release Date:</span
              ><span class="fw300">{{ detail.release }}</span>
            </p>
            <p>
              <span class="fbold">Audience score:</span
              ><span class="fw300">{{ detail.audience }}</span>
            </p>
          </div>

          <div class="theater-near">
            <h3>Theaters near</h3>
            <p>Please set your location to see showtimes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { getMovieDetail } from "../../hooks/getMovieInfo";
export default {
  name: "movieDetail",
  setup() {
    const movie = getMovieDetail();
    return { ...toRefs(movie) };
  },
};
</script>

<style lang='less' scoped>
.error {
  margin: 2.2rem 4.6rem;
  color: rgb(40, 113, 177);
  font-size: 20px;
}
.movie-detail {
  .movie-detail-img {
    width: 100%;
    text-align: center;
    background-color: rgba(36, 47, 66, 0.4);
    .el-image {
      width: 623px;
      height: 350px;
    }
  }
  .primary-info {
    color: rgb(51, 62, 72);
    font-size: 0.875rem;
    display: flex;
    padding: 0 5rem;
    box-sizing: border-box;
    margin-top: 2.5rem;
    width: 100%;
    .detail-left {
      box-sizing: border-box;
      padding-right: 4rem;
      width: calc(100% - 200px);
      .title-wrap {
        .title {
          margin-bottom: 0.625rem;
        }
        .meta {
          font-weight: 300;
        }
      }
      .movie-info {
        margin: 2.875rem 0;
        .summary {
          margin-bottom: 1.5rem;
        }
        .info-brief {
          .fbold {
            font-weight: bold;
            margin-right: 0.675rem;
          }
          color: #a8a8a8;
          padding-bottom: 2.5rem;
        }
      }
    }
  }
}
</style>