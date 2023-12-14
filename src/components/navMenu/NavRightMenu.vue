<template>
    <div :class="platformStore.control.navSelect?'nav-about active':'nav-about'" >
        <NavRightMenuAbout v-if="platformStore.control.navSelect === 'about'"/>
        <NavRightMenuQnA v-if="platformStore.control.navSelect === 'qna'"/>
        <NavRightMenuContact v-if="platformStore.control.navSelect === 'contact'"/>
        <div class="close_mark" @click="() => { platformStore.control.navSelect = '' }">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import NavRightMenuAbout from './NavRightMenuAbout.vue'
import NavRightMenuQnA from './NavRightMenuQnA.vue'
import NavRightMenuContact from './NavRightMenuContact.vue'

import { usePlatformStore } from '../../stores/PlatformStore'

const platformStore = usePlatformStore()

</script>

<style lang="scss">
.nav-about {
    position: absolute;
    width: 40em;
    height: 80vh;
    background: #ffffff;
    border: 1px rgb(198, 198, 198) solid;
    border-radius: 0.4em;
    right: 0;
    font-family: 'Noto Serif TC', serif;
    transform: translateY(-200%);
    // display: none;
    opacity: 0;
    transition: .3s opacity ease-in-out;
    overflow-y: scroll;
    h1 {
        font-size: 1.5em;
        font-weight: 700;
        margin: 2em 0 1em;
    }
    h2 {
        font-size: 1.3em;
        font-weight: 700;
    }
    p {
        margin: 1em 4em 3em;
        text-align: left;
        line-height: 1.5em;
        text-align: justify;
    }
    ul, ol {
        margin: 1em 6em 2em;
        list-style: square;
        display: flex;
        flex-direction: column;
        text-align: left;
        li {
            line-height: 2em;
        }
    }
    ol {
        list-style: a;
    }
    .close_mark {
        width: 1.5em;
        height: 1.5em;
        position: fixed;
        top: 2em;
        left: 2em;
        z-index: 100;
        &:hover {
            cursor: pointer;
        }
    }
}

.active {
    transform: translateX(0);
    // display: block;
    opacity: 1;
}
</style>