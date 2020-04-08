<template>
  <div id="app">
    <vue-particles
            class="vue-particles"
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
    ></vue-particles>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app"
  };
</script>

<style>
  .vue-particles {
    position: fixed;
    background-image: url("https://www.sushao.top/api/blog/home/img/-1");
    background-size: cover;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
<style scoped>
</style>
