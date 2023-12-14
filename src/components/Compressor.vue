<template>
    <div class="comp-main">
        <div class="effect-wrap">
            <p>Compressor</p>
            <div class="knobs-wrap">
                <div class="knob-label-wrap">
                    <input type="range" min="-80" max="0" id="threshold" class="input-knob" 
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetThreshold" :value="ampStore.parameters.comp.threshold">
                    <label for="threshold">Threshold</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="1" max="20" id="ratio" class="input-knob" 
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetRatio" :value="ampStore.parameters.comp.ratio">
                    <label for="ratio">Ratio</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="1" step=".001" id="attack" class="input-knob" 
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetAttack" :value="ampStore.parameters.comp.attack">
                    <label for="attack">Attack</label>
                </div>
                <div class="knob-label-wrap">
                    <input type="range" min="0" max="1" step=".001" id="release" class="input-knob" 
                           data-diameter="60" data-src="/knob_imgs/knob70.png" data-sprites="100"
                           @input="handleSetRelease" :value="ampStore.parameters.comp.release">
                    <label for="release">Release</label>
                </div>        
            </div>
        </div>
        <div class="switch-label-wrap">
            <input id="overdrive_toggle" type="checkbox" class="input-switch" 
                   data-src="/knob_imgs/ob_button.png" data-diameter="50"
                   @click="handleToggleComp" :checked="ampStore.parameters.comp.toggle"/>
            <!-- <label for="overdrive_toggle">bypass</label> -->
        </div>
    </div>
</template>

<script setup>

    import { useAmpStore } from '../stores/AmpStore';
    const ampStore = useAmpStore()

    const handleToggleComp = (e) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            ampStore.parameters.comp.toggle = 1
        } else {
            ampStore.parameters.comp.toggle = 0 
        }
    }
    const handleSetThreshold = (e) => {
        ampStore.parameters.comp.threshold = e.target.value
    }
    const handleSetRatio = (e) => {
        ampStore.parameters.comp.ratio = e.target.value
    }
    const handleSetAttack = (e) => {
        ampStore.parameters.comp.attack = e.target.value
    }
    const handleSetRelease = (e) => {
        ampStore.parameters.comp.release = e.target.value
}

</script>

<style lang="scss" scoped>
@import '../__global.scss';
.comp-main {
    grid-area: cmp;
    width: 230 * $unit-length;
    height: 290 * $unit-length;
    background: #bababa;
    border: 3 * $unit-length gray solid;
    border-radius: 10 * $unit-length;
    color: white;
    .effect-wrap {
        border: 3 * $unit-length white solid;
        border-radius: 10 * $unit-length;
        margin: 20 * $unit-length;
        margin-bottom: 8px;
        padding: 5 * $unit-length;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-weight: 700;
        }
        .knobs-wrap {
            display: grid;
            grid-template: 1fr 1fr / 1fr 1fr;
            // background: #000;
            .knob-label-wrap {
                // display: flex;
                // flex-direction: column;
                // margin: auto;
                label {
                    text-align: center;
                }
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