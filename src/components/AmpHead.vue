<template>
    <div class="amphead-main">
        <div class="effect-wrap">
            <p>Input</p>
            <div class="knobs-wrap">
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="10" step=".01" id="ampDriveGain" class="input-knob" 
                           data-diameter="60" data-src="./knob_imgs/knob70.png" data-sprites="100"
                           @input="handleInputAmpDriveGain" :value="ampStore.parameters.ampDrive.gain">
                    <label for="ampDriveGain">Gain</label>
                </div>
                <div class="knob-label-wrap">
                    <input id="ampdrive_toggle" type="checkbox" class="input-switch" 
                           data-src="./knob_imgs/switch_offon.png" data-diameter="50"
                           @click="handleToggleAmpDrive" :checked="ampStore.parameters.ampDrive.toggle"/>
                    <label for="ampdrive_toggle">Drive On</label>
                </div>
            </div>
        </div>
        <div class="effect-wrap">
            <p>Equalizer</p>
            <div class="knobs-wrap">
                <div class="knob-label-wrap">
                    <input type="range" min="-20" max="20" step=".1" id="bass" class="input-knob" 
                           data-diameter="60" data-src="./knob_imgs/knob70.png" data-sprites="100"
                           @input="handleInputEqBassGain" :value="ampStore.parameters.eq.bassGain">
                    <label for="bass">Bass</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="-20" max="20" step=".1" id="mid" class="input-knob" 
                           data-diameter="60" data-src="./knob_imgs/knob70.png" data-sprites="100"
                           @input="handleInputEqMidGain" :value="ampStore.parameters.eq.midGain">
                    <label for="mid">Mid</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="-20" max="20" step=".1" id="treble" class="input-knob" 
                           data-diameter="60" data-src="./knob_imgs/knob70.png" data-sprites="100"
                           @input="handleInputEqTrebleGain" :value="ampStore.parameters.eq.trebleGain">
                    <label for="treble">Treble</label>
                </div>
            </div>
        </div>
        <div class="effect-wrap">
            <p>Output</p>
            <div class="knobs-wrap">
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="1" step="0.01" id="master" class="input-knob" 
                           data-diameter="60" data-src="./knob_imgs/knob70.png" data-sprites="100"
                           @input="handleInputMasterVolume" :value="ampStore.parameters.masterVolume">
                    <label for="master">Volume</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAmpStore } from '../stores/AmpStore';
const ampStore = useAmpStore()
const handleInputAmpDriveGain = (e) => {
    ampStore.parameters.ampDrive.gain = e.target.value
}
const handleToggleAmpDrive = (e) => {
    if (e.target.checked) {
        console.log(e.target.checked)
        ampStore.parameters.ampDrive.toggle = 1
    } else {
        console.log(e.target.checked,'false')
        ampStore.parameters.ampDrive.toggle = 0
    }
}
const handleInputEqBassGain = (e) => {
    ampStore.parameters.eq.bassGain = e.target.value
}
const handleInputEqMidGain = (e) => {
    ampStore.parameters.eq.midGain = e.target.value
}
const handleInputEqTrebleGain = (e) => {
    ampStore.parameters.eq.trebleGain = e.target.value
}
const handleInputMasterVolume = (e) => {
    ampStore.parameters.masterVolume = e.target.value
}
</script>

<style lang="scss" scoped>
@import '../__global.scss';
    .amphead-main {
        width: 600 * $unit-length;
        background: rgb(47, 47, 47);
        border: 3 * $unit-length rgb(145, 145, 145) solid;
        border-radius: 10 * $unit-length;
        display: flex;
        .effect-wrap {
            border: 3 * $unit-length white solid;
            border-radius: 10 * $unit-length;
            margin: 20 * $unit-length;
            p {
                margin: 5 * $unit-length;
                color: white;
                font-weight: bold;
            }
            .knobs-wrap {
                display: flex;
                padding: 10 * $unit-length;
                .knob-label-wrap {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .input-knob {
                        // background-size: 60 * $unit-length 60 * 101 * $unit-length !important;
                        // background-position: 0 -96 * 60 * $unit-length !important;
                        // background: #9c3d3d;
                        // background-repeat: no-repeat;
                    }
                    .input-knob:focus {
                        outline: none;
                    }
                    .input-switch {

                    }
                    label {
                        color: white
                    }
                }
            }
        }
    }
</style>