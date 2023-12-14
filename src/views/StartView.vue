<template>
    <div class="start-view-wrap">
        <!-- <h1>agwurn | AG Web Amp mini</h1> -->
        <h1>AG Web Amp</h1>
        <div class="text-mini">mini</div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.start-view-wrap {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: #d7d2cc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Serif TC', serif;
    h1 {
        font-size: 5vh;
        font-weight: 700;
    }
    .text-mini {
        // position: absolute;
        // top: 119px;
        // right: 15px;
        transform: translateY(150%);
    }
    h1, .text-mini {
        animation: showUp .3s .3s forwards ease-in-out;
        opacity: 0;
        @keyframes showUp {
            0% {}
            100% {
                opacity: 1;
            }
        }
    }
    transform: translateY(0);
    animation: slideUp 1s 1.5s forwards ease-in-out;
    @keyframes slideUp {
        0% {}
        100% {
            transform: translateY(-100%);
        }
    }
}
</style>