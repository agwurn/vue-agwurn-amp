<template>
    <div class="od-main">
        <div class="effect-wrap">
            <p>Overdrive</p>
            <div class="knobs-wrap">
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="20" step=".1" id="overdrive_gain" class="input-knob" 
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetOverdriveGain" :value="ampStore.parameters.overdrive.gain">
                    <label for="overdrive_gain">Gain</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="1000" max="20000" step="1" id="overdrive_tone" class="input-knob"
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetOverdriveTone" :value="ampStore.parameters.overdrive.tone">
                    <label for="overdrive_tone">Tone</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="1" step=".01" id="overdrive_level" class="input-knob"
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetOverdriveLevel" :value="ampStore.parameters.overdrive.level">
                    <label for="overdrive_level">Level</label>
                </div>
            </div>
        </div>
        <div class="switch-label-wrap">
            <input id="overdrive_toggle" type="checkbox" class="input-switch" 
                   data-src="/knob_imgs/ob_button.png" data-diameter="50"
                   @click="handleToggleOverdrive" :checked="ampStore.parameters.overdrive.toggle"/>
            <!-- <label for="overdrive_toggle">on</label> -->
        </div>
    </div>
</template>

<script setup>
import { useAmpStore } from '../stores/AmpStore';
const ampStore = useAmpStore()
const handleToggleOverdrive = (e) => {
    if (e.target.checked) {
        console.log(e.target.checked)
        ampStore.parameters.overdrive.toggle = 1
    } else {
        console.log(e.target.checked,'false')
        ampStore.parameters.overdrive.toggle = 0
    }
}
const handleSetOverdriveGain = (e) => {
    console.log(e.target.value)
    ampStore.parameters.overdrive.gain = e.target.value
}
const handleSetOverdriveTone = (e) => {
    ampStore.parameters.overdrive.tone = e.target.value
}
const handleSetOverdriveLevel = (e) => {
    ampStore.parameters.overdrive.level = e.target.value
    }
</script>

<style lang="scss" scoped>
@import '../__global.scss';
.od-main {
    grid-area: ovd;
    width: 230 * $unit-length;
    // height: 282 * $unit-length;
    background: #96c297;
    border: 3 * $unit-length gray solid;
    border-radius: 10 * $unit-length;
    color: white;
    .effect-wrap {
        border: 3 * $unit-length white solid;
        border-radius: 10 * $unit-length;
        margin: 20 * $unit-length;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5 * $unit-length;
        p {
            font-weight: 700;
        }
        .knobs-wrap {
            margin: 20 * $unit-length;
            display: flex;
            .knob-label-wrap {
                display: flex;
                flex-direction: column;
            }
        }
    }
    .switch-label-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>