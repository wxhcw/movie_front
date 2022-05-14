<template>
  <div class="user-index">
    <Header :userinfo="userinfo" :isAdmin="false" />
    <div class="movie-total">
      <MovieList keyWord="weekly"/>
      <MovieList keyWord="top"/>
      <MovieList keyWord="soon"/>
    </div>
    <UserCenter />
  </div>
</template>

<script>
import getUserInfo from "../hooks/getUserInfo";
import Header from "../component/Header.vue";
import MovieList from "./component/movieList.vue";
import UserCenter from "./userCenter.vue";
export default {
  name: "user",
  components: {
    Header,
    UserCenter,
    MovieList,
  },
  setup() {
    let userinfo = getUserInfo().userinfo;
    return { userinfo };
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
