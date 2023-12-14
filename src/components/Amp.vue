<template>
    <div class="amp-main">
        <div class="amp-body">

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .amp-main {
        width: 600px;
        height: 415px;
        background: black;
        border-radius: 5px;
        border: 3px gray solid;
        display: flex;
        .amp-body {
            margin: auto;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            // padding: 10px;
            // background: rgb(216, 194, 144);
            background: linear-gradient(45deg, #dca 12%, transparent 0, transparent 88%, #dca 0),
            linear-gradient(135deg, transparent 37%, rgb(187, 183, 123) 0%, #a85 63%, transparent 0),
            linear-gradient(45deg, transparent 37%, #dca 0%, #dca 63%, transparent 0);
            background-size: 12px 12px;            
            border: 2px gray solid;
            border-radius: 5px;
            // https://www.youtube.com/watch?v=yNtgYH2Ayrs
        }
    }
</style>