<template>

    <div :class="platformStore.control.togglePresetMenu?'preset-menu-wrap active':'preset-menu-wrap'" @click="handleClosePresetMenu">
        <div class="menu" @click.stop="">
            <button @click="handleClosePresetMenu">x</button>
            <h1>presets</h1>
            <ul class="preset-nav">
                <li @click="() => handleSetFilterAuthor('all')">all</li> |
                <li @click="() => handleSetFilterAuthor('agwurn')">agwurn's</li> |
                <li @click="() => handleSetFilterAuthor(platformStore.user.name)">your's</li>
            </ul>
            <table class="preset-list">
                <tr>
                    <th class="preset-author">author</th>
                    <th class="preset-name">preset name</th>
                </tr>
                <tr v-for="preset in filterdPresetList" :key="preset.presetName" @click="handleSetPreset(preset)">
                    <td>{{ preset.author }}</td>
                    <td>{{ preset.presetName }}</td>
                </tr>
            </table>
            <p class="preset-message" v-if="filterdPresetList==''">You didn't save any preset.</p>
        </div>
    </div>

</template>

<script setup>
    import { collection, getDocs, getFirestore } from "firebase/firestore"; 
    import { computed, ref } from 'vue';
    import { usePlatformStore } from '../stores/PlatformStore';
    import { useAmpStore } from "../stores/AmpStore";

    import app from '../configurations/firebase'
    import { onMounted } from "@vue/runtime-core";
    const db = getFirestore(app)

    const platformStore = usePlatformStore()
    const ampStore = useAmpStore()

    const togglePresetMenu = computed(() => {
        platformStore.control.togglePresetMenu
    })

    const handleClosePresetMenu = () => {
        platformStore.control.togglePresetMenu = !platformStore.control.togglePresetMenu
    }

    const presetList = ref([])
    const fetchDatabasePresets = async () => {
        const querySnapshot = await getDocs(collection(db, "presets"));
        let tempPresetList = []
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`
            tempPresetList.push(doc.data())
        });
        presetList.value = tempPresetList
    }
    onMounted(() => {
        fetchDatabasePresets()
    })

    const handleSetPreset = (preset) => {
        console.log(preset)
        ampStore.presetName = preset.presetName
        ampStore.parameters = preset.parameters
        // console.log(ampStore)
    }

    const filterAuthor = ref('all')
    const handleSetFilterAuthor = (author) => {
        filterAuthor.value = author
    }
    const filterdPresetList = computed(() => {
        if (filterAuthor.value === 'all') {
            return presetList.value
        } else {
            return presetList.value.filter((p) => { return p.author === filterAuthor.value})
        }
    })

</script>

<style lang="scss" scoped>
.preset-menu-wrap {
    font-family: 'Noto Serif TC', serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: #eaeaeabf;
    // display: flex;
    transform: translateX(-200%);
    transition: .5s ease-out;
    .menu {
        // margin: 0 auto;
        width: 80vw;
        height: 100vh;
        background: #ffffff;
        border-right: 3px gray solid;
        padding-top: 20px;
        button {
            position: absolute;
            // left: calc(60vw - 1em);
            transform: translateX(27vw);
            background: #00000000;
            border-radius: 2px;
            width: 2em;
            height: 2em;
            cursor: pointer;
        }
        h1 {
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 1em;
        }
        .preset-nav {
            display: flex;
            justify-content: center;
            padding: 2em;
            gap: 1em;
        }
        .preset-list {
            margin: auto;
            padding: 30px;
            // border: 4px red solid;
        }
        tr {
            
            th {
                border-bottom: 1px solid rgb(198, 198, 198);
                padding: 1em 5em;
            }
            th.preset-name {
                width: 30vw;
            }
            th.preset-author {
                width: 14vw;
            }
        }
        tr {
            border-bottom: 1px rgba(204, 204, 204, 0.268) solid;
            td {
                padding: 1em 5em;
                // background: #000;
                text-align: left;
            }
            &:not(:first-child):hover {
                background: #f6f1e598;
                cursor: pointer;
                color: rgb(139, 126, 255);
            }
        }
        .preset-message {
            padding-top: 3em;
            color: rgb(123, 123, 123);
        }
    }
}
.active {
    transform: translateX(0);
}
</style>