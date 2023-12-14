<script setup>
  import AgwurnAmp from "./views/AgwurnAmp.vue";
  import Header from "./components/Header.vue";
  import StartView from "./views/StartView.vue";
  import PresetMenu from "./components/PresetMenu.vue";

  console.log(window.outerWidth);
  if (window.outerWidth <= 900) {
    alert("不好意思！手機版正在努力中！請使用電腦來開啟");
  }
  document.documentElement.style.setProperty(
    "--masterScale",
    window.outerHeight * 0.001
  );
  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
      "--masterScale",
      window.outerHeight * 0.001
    );
  });
</script>

<template>
  <div class="app">
    <StartView />
    <PresetMenu />
    <Header />
    <div class="content">
      <AgwurnAmp />
    </div>
  </div>
</template>

<style lang="scss">
  body {
    // overflow-x: hidden;
  }
  .app {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5em 9fr;

    .active {
      transform: translateX(0);
    }

    .content {
      display: flex;
      transform: scale(var(--masterScale));
      // transform-origin: top;
      @media screen and (max-width: 1000px) {
        // height: 100px;
        // background-color: lightgreen;
      }
    }
  }
</style>
