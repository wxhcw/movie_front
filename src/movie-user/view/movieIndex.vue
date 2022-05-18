<template>
  <div class="movie-total">
    <!-- <Test :movieData="movie.soon" /> -->
    <MovieList :movieData="movie.week" title="Opening This Week" />
    <MovieList :movieData="movie.top" title="Top Box Office" />
    <MovieList :movieData="movie.soon" title="Coming Soon" />
  </div>
</template>
<script>
import { getMovieInfo } from "../../hooks/getMovieInfo";
import MovieList from "./movieList.vue";
export default {
  name: "movieIndex",
  components: {
    MovieList,
  },
  setup() {
    let movie = getMovieInfo();
    return { movie };
  },
};
</script>
<style scoped>
@media (min-width: 1101px) {
  .movie-total {
    padding: 0 2rem 3rem;
    margin: 0px auto;
  }
}
</style>