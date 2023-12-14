import { defineStore } from "pinia";

export const usePlatformStore = defineStore('platformStore', {
    state: () => {
        return {
            user: {
                name: '',
                photo: '',
            },
            control: {
                togglePresetMenu: false,
                navSelect: '',
            }
        }
    }
})