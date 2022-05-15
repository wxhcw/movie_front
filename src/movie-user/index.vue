<template>
  <div class="user-index">
    <Header :userinfo="user.userinfo" :isAdmin="false" />
    <div class="movie-total">
      <!-- <Test :movieData="movie.soon" /> -->
      <MovieList :movieData="movie.week" title="Opening This Week"/>
      <MovieList :movieData="movie.top" title="Top Box Office" />
      <MovieList :movieData="movie.soon" title="Coming Soon" />
    </div>
    <!-- <UserCenter /> -->
  </div>
</template>

<script>
import getUserInfo from "../hooks/getUserInfo";
import getMovieInfo from "../hooks/getMovieInfo";
import Header from "../component/Header.vue";
import MovieList from "./component/movieList.vue";
// import Test from "./component/vtest.vue";
// import UserCenter from "./userCenter.vue";
export default {
  name: "user",
  components: {
    Header,
    // UserCenter,
    MovieList,
    // Test,
  },
  setup() {
    let user = getUserInfo();
    let movie = getMovieInfo();
    // console.log(movieinfo);
    // console.log(movieinfo.soon);
    return { user, movie };
  },
};
</script>

<style lang='less' scoped>
.user-index {
  min-width: 630px;
  overflow: auto;
  height: 100%;
  @media (min-width: 1101px) {
    .movie-total {
      padding: 0 2rem;
      margin: 0px auto;
    }
  }
}
</style>
