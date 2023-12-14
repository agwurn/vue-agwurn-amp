<template>
  <div class="agwurn-amp-all" ref="el">
    <Compressor />
    <Overdrive />
    <div class="head-amp-wrap">
      <AmpHead :knobheight="knobheight" />
      <Amp />
    </div>
    <Logo />
    <Reverb />
  </div>
  <NavRightMenu />
</template>

<script setup>
  import AmpHead from "../components/AmpHead.vue";
  import Amp from "../components/Amp.vue";
  import Overdrive from "../components/Overdrive.vue";
  import Compressor from "../components/Compressor.vue";
  import Reverb from "../components/Reverb.vue";
  import Logo from "../components/Logo.vue";
  import NavRightMenu from "../components/navMenu/NavRightMenu.vue";

  import { useAmpStore } from "../stores/AmpStore";

  import AgwurnAmp from "../composables/ampCore";

  const ampStore = useAmpStore();
  ampStore.$subscribe((mutations, state) => {
    ampCore.updateAmp();
  });

  const ampCore = new AgwurnAmp(ampStore);
  ampCore.initAmp();
</script>

<style lang="scss" scoped>
  @import "../__global.scss";
  .agwurn-amp-all {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    grid-template-areas:
      "cmp amp logo"
      "ovd amp rev";
    grid-gap: 10 * $unit-length;
    background: hsl(240, 5%, 24%);
    padding: 15 * $unit-length;
    border: 3 * $unit-length gray solid;
    border-radius: 5 * $unit-length;
    transform: translate(-50%, -50%);
    width: 1100px;
    height: 600px;

    .head-amp-wrap {
      grid-area: amp;
    }
  }
</style>
