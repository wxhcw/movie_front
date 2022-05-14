<template>
  <div class="movie-list">
    <div v-show="isShowPre" class="button" @click="prePage">
      <el-icon :size="20"><ArrowLeft /></el-icon>
    </div>
    <div v-show="!isShowPre" class="button"></div>
    <div class="movie-list-item">
      <div class="movie-type">
        <h2>{{ keyWord }}</h2>
        <!-- <h2>Opening This Week</h2> -->
      </div>
      <div class="movie-row">
        <div class="movie-col-li" v-for="item in dataShow" :key="item.id">
          <el-card :body-style="{ padding: '0px' }" class="movie-box">
            <el-image :src="item.poster" lazy />
            <div class="movie-bottom">
              <div class="movie-box-name" :title="item.name">
                {{ item.name }}
              </div>
              <div class="movie-box-score">{{ item.score }}</div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div v-show="isShowNext" class="button" @click="nextPage">
      <el-icon :size="20"><ArrowRight /></el-icon>
    </div>
    <div v-show="!isShowNext" class="button"></div>
  </div>
</template>

<script>
import { getMovWeek, getMovSoon } from "../../server/movie";
import { onMounted, reactive, toRefs, ref, watch, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "movieList",
  props: ["keyWord"],
  setup() {
    //获取电影数据的信息（包括分页）
    const movie = reactive({
      week: [],
      soon: [],
      pageSize: 6,
      pageNum: 1,
      totalPage: [],
      dataShow: "",
      currentPage: 0,
    });
    //控制按钮图标是否展示
    const isShowPre = ref(false);
    const isShowNext = ref(true);
    //下一页
    const nextPage = () => {
      movie.dataShow = movie.totalPage[++movie.currentPage]; //currentPage一定要先加一
      if (movie.currentPage === movie.pageNum - 1) isShowNext.value = false;
      else isShowPre.value = true;
    };
    //上一页
    const prePage = () => {
      movie.dataShow = movie.totalPage[--movie.currentPage];
      if (movie.currentPage === 0) isShowPre.value = false;
      else isShowNext.value = true;
    };
    //获取浏览器窗口宽度
    let screenWidth = ref(document.body.clientWidth);
    // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    let timer = null;
    const flag = ref(false);
    watch(
      // 监听浏览器窗口的宽度，以便做适配
      screenWidth,
      (newValue) => {
        if (newValue < 630) return; //配置的最小宽度就是630
        if (!flag.value) {
          screenWidth.value = newValue;
          flag.value = true;

          timer = setTimeout(() => {
            const res = document.getElementsByClassName("el-image");
            for (let i = 0; i < res.length; i++) {
              res[i].style.height = res[i].offsetWidth / 0.66 + "px";
            }
            // console.log("height: ", res[0].offsetHeight);
            flag.value = false;
          }, 400);
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      window.onresize = () => {
        return (() => {
          screenWidth.value = document.body.clientWidth;
        })();
      };
      getMovSoon().then(
        (res) => {
          movie.soon = res.data;
        },
        (err) => {
          ElMessage.error(err.message);
        }
      );
      getMovWeek().then((res) => {
        if (res.status) {
          ElMessage.error(res.message);
        } else {
          movie.week = res.data;
          movie.pageNum = Math.ceil(movie.week.length / movie.pageSize) || 1;

          for (let i = 0; i < movie.pageNum; i++) {
            movie.totalPage[i] = movie.week.slice(
              movie.pageSize * i,
              movie.pageSize * (i + 1)
            );
          }
          // 获取到数据后显示第一页内容
          movie.dataShow = movie.totalPage[movie.currentPage];
        }
      });
    });
    //销毁定时器防止内存泄漏
    onBeforeUnmount(() => {
      clearTimeout(timer);
      timer = null;
    });
    return {
      ...toRefs(movie),
      prePage,
      nextPage,
      isShowPre,
      isShowNext,
    };
  },
};
</script>
<style lang='less' scoped>
.movie-list {
  padding-top: 2.5rem;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  .button {
    width: 3%;
    cursor: pointer;
    position: relative;
    .el-icon {
      position: absolute;
      top: 50%;
      margin-top: -16px;
    }
    &:hover {
      .el-icon {
        color: #cbcbca;
      }
    }
  }
  .movie-list-item {
    width: 92.4%;
    .movie-type {
      font-family: ProximaNova;
      padding-bottom: 1.5rem;
      h2 {
        font-size: 1rem;
      }
    }

    .movie-row {
      display: flex;
      .movie-col-li {
        width: 16.67%;
        box-sizing: border-box;
        padding-right: 1.8%;
        .el-card {
          border: none;
        }
        .el-card.is-always-shadow {
          box-shadow: none;
        }
        .movie-box {
          width: 100%;
          .el-image {
            width: 100%;
            height: 100%;
          }
          .movie-bottom {
            padding: 0.875rem;
            .movie-box-name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .movie-box-score {
              margin-top: 0.81rem;
              line-height: 0.75rem;
            }
          }
        }
      }
    }
  }
}
</style>
