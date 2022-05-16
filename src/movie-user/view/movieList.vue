<template>
  <div class="movie-list">
    <div v-show="isShowPre" class="button" @click="prePage">
      <el-icon :size="20"><ArrowLeft /></el-icon>
    </div>
    <div v-show="!isShowPre" class="button"></div>
    <div class="movie-list-item">
      <div class="movie-type">
        <h2>{{ title }}</h2>
      </div>
      <div class="movie-row">
        <div class="movie-col-li" v-for="item in dataShow" :key="item.id">
          <router-link :to="`/user/movie/detail/${item.name}`">
            <el-card :body-style="{ padding: '0px' }" class="movie-box">
              <el-image :src="item.poster" lazy />
              <div class="movie-bottom">
                <div class="movie-box-name" :title="item.name">
                  {{ item.name }}
                </div>
                <div v-if="item.score" class="movie-box-score">
                  {{ item.score }}
                </div>
                <div v-else class="movie-box-score italic">
                  opens {{ item.release }}
                </div>
              </div>
            </el-card>
          </router-link>
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
import {
  toRefs,
  reactive,
  onMounted,
  ref,
  watch,
  onBeforeUnmount,
  onBeforeUpdate,
} from "vue";
export default {
  name: "movieList",
  props: ["movieData", "title"],
  setup(props) {
    const { movieData } = toRefs(props);
    // 电影分页信息
    const moviePage = reactive({
      size: 6, //每页显示个数
      num: 1, //总共几页
      total: [],
      curPage: 0, //当前页数
    });
    const dataShow = ref({}); //最终每页展示数据来源
    const initPage = () => {
      moviePage.num = Math.ceil(movieData.value.length / moviePage.size) || 1;
      for (let i = 0; i < moviePage.num; i++) {
        moviePage.total[i] = movieData.value.slice(
          moviePage.size * i,
          moviePage.size * (i + 1)
        );
      }
      // 获取到数据后显示第一页内容
      dataShow.value = moviePage.total[moviePage.curPage];
    };
    onMounted(() => {
      initPage();
      // 监听窗口宽度引发screenWidth的值变化
      window.onresize = () => {
        return (() => {
          screenWidth.value = document.body.clientWidth;
        })();
      };
    });
    //控制按钮图标是否展示
    onBeforeUpdate(() => {
      initPage();
    });
    const isShowPre = ref(false);
    const isShowNext = ref(true);
    //下一页
    const nextPage = () => {
      dataShow.value = moviePage.total[++moviePage.curPage]; //curPage一定要先加一
      if (moviePage.curPage === moviePage.num - 1) isShowNext.value = false;
      else isShowPre.value = true;
    };
    //上一页
    const prePage = () => {
      dataShow.value = moviePage.total[--moviePage.curPage];
      if (moviePage.curPage === 0) isShowPre.value = false;
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
        if (newValue < 680) return; //配置的最小宽度就是680
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

    //销毁定时器防止内存泄漏
    onBeforeUnmount(() => {
      clearTimeout(timer);
      timer = null;
    });
    return {
      // moviePage,
      dataShow,
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
            height: 303px;
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
              line-height: 1.2rem;
              font-weight: 300;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .italic {
              font-style: italic;
            }
          }
        }
      }
    }
  }
}
</style>
