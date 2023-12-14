<template>
    <div class="logo">
        <h1>AG Web Amp</h1>
        <div class="text-mini">mini</div>
        <div class="dashboard">
            <p>preset</p>
            <p class="preset-display" contenteditable="true" ref="presetNameRef" @input="handleInputPresetName">{{ ampStore.presetName }}</p>
            <div class="load-save-btn-wrap">
                <button @click="handleLoadPreset">load</button>
                <button @click="handleSavePreset">save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { doc, setDoc  } from "firebase/firestore"; 
    import { getFirestore } from "firebase/firestore";
    
    import app from '../configurations/firebase'
    import { useAmpStore } from '../stores/AmpStore';
    import { usePlatformStore } from '../stores/PlatformStore'
    import { ref, onMounted } from "vue";

    const db = getFirestore(app)
    const ampStore = useAmpStore()
    const platformStore = usePlatformStore()
    const presetNameRef = ref(null)

    // onMounted(() => {
    //     presetNameRef.value.textContent = ampStore.presetName
    // })

    const handleInputPresetName = () => {
        ampStore.presetName = presetNameRef.value.textContent
    }

    const handleLoadPreset = () => {
        platformStore.control.togglePresetMenu = !platformStore.control.togglePresetMenu
    }
    const handleSavePreset = async () => {
        if (platformStore.user.name) {
            try {
                await setDoc(doc(db, "presets", ampStore.presetName), {
                    presetName: ampStore.presetName,
                    author: platformStore.user.name,
                    parameters: ampStore.parameters
                });
                console.log("preset saved successfully");
                alert(`preset "${ampStore.presetName}" saved successfully`)
            } catch (e) {
                console.error("Error adding preset: ", e);
            }
        } else {
            alert('please log in to save presets')
        }
    }
</script>

<style lang="scss" scoped>
.logo {
    grid-area: logo;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h1 {
        font-family: 'Noto Serif TC', serif;
        font-size: 30px;
        font-weight: 700;
        margin: 2em 0;
    }
    .text-mini {
        font-family: 'Noto Serif TC', serif;
        position: absolute;
        top: 119px;
        right: 15px;

    }
    .dashboard {
        // border: 3px white solid;
        // border-radius: 6px;
        // background: #919191;
        p {
            // background: #000;
            text-align: left;
            padding: 3px;
        }
        .preset-display {
            height: 2em;
            background: #4e6547;
            line-height: 2em;
            border: 3px rgb(43, 43, 43) solid;
            border-radius: 5px;
            text-align: center;
        }
        .load-save-btn-wrap {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin: 15px;
            button {
                border-radius: 6px;
                width: 5em;
                height: 2em;
                background: #dadada;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>