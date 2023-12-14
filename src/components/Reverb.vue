<template>
    <div class="reverb-main">
        <div class="effect-wrap">
            <p>Reverb</p>
            <div class="knobs-wrap">
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="1" step=".01" id="reverbWetDry" class="input-knob"
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetReverbWetDry" :checked="ampStore.parameters.reverb.wetDry">
                    <label for="reverbWetDry">wet/dry</label>
                </div>
            </div>
        </div>
        <div class="reverb-select-wrap">
            <button @click="handleChangeReverbType(-1)">-</button>
            <div class="monitor">
                {{ ampStore.parameters.reverb.type }}
            </div>
            <button @click="handleChangeReverbType(1)">+</button>
        </div>
        <input id="reverb_toggle" type="checkbox" class="input-switch" 
               data-src="/knob_imgs/ob_button.png" data-diameter="50"
               @click="handleToggleReverb" ref="reverb_toggle" :checked="ampStore.parameters.reverb.toggle"/>
    </div>
</template>

<script setup>
    import { computed } from '@vue/runtime-core';
    import { useAmpStore } from '../stores/AmpStore';

    const ampStore = useAmpStore()
    const handleSetReverbWetDry = (e) => {
        ampStore.parameters.reverb.wetDry = e.target.value
    }
    const handleChangeReverbType = (direction) => {
        const reverbType = ['spring', 'room', 'hall']
        const originalIndex = reverbType.indexOf(ampStore.parameters.reverb.type)
        const newIndex = ( originalIndex + direction + 3 ) % 3
        console.log(newIndex)
        ampStore.parameters.reverb.type = reverbType[newIndex]
    }
    const handleToggleReverb = () => {
        ampStore.parameters.reverb.toggle = (ampStore.parameters.reverb.toggle + 1) % 2
        console.log(ampStore.parameters.reverb.toggle)
    }

</script>

<style lang="scss" scoped>
@import '../__global.scss';
.reverb-main {
    grid-area: rev;
    width: 230 * $unit-length;
    // height: 290 * $unit-length;
    background: #93b4d1;
    border: 3 * $unit-length gray solid;
    border-radius: 10 * $unit-length;
    color: white;
    .effect-wrap {
        border: 3 * $unit-length white solid;
        border-radius: 10 * $unit-length;
        margin: 20 * $unit-length;
        margin-bottom: 0;
        padding: 5 * $unit-length;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-weight: 700;
        }
        .knobs-wrap {
            margin-bottom: 20 * $unit-length;
            display: flex;
            .knob-label-wrap {
                display: flex;
                flex-direction: column;
            }
        }
    }
    .reverb-select-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10 * $unit-length 20px;
        // background: #000;
        // margin: 0 px;
        .monitor {
            width: 126 * $unit-length;
            height:  21 * $unit-length;
            background: gray;
            margin: 10 * $unit-length;
            line-height: 20 * $unit-length;
            border: 2px rgb(72, 72, 72) solid;
            border-radius: 5px;
        }
        button {
            width: 24 * $unit-length;
            height: 25 * $unit-length;
            border-radius: 5px;
            background: #cdcdcd;
            font-weight: 700;
            // color: white;
        }
    }
}
</style>