<template>
  <template>
    <el-col>
      <el-card :body-style="{ padding: '0px' }">
        <el-image :src="movie.poster" lazy />
        <div style="padding: 14px">
          <span>{{ movie.name }}</span>
          <div class="bottom">
            <p>score: 9.7</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </template>
</template>

<script>
export default {
  name: "movieItem",
  props: ["movie"],
};
</script>

<style lang='less' scoped>
.movie-item {
  .el-card {
    border: none;
  }
  .el-card.is-always-shadow {
    box-shadow: none;
  }
  @media (min-width: 1101px) {
    .el-image {
      height: 314px;
      width: 211px;
    }
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
}
</style>