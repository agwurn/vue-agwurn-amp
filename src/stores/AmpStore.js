import { defineStore } from "pinia";

export const useAmpStore = defineStore('ampStore', {
    state: () => {
        return {
            presetName: 'default',
            parameters: {
                comp: {
                    toggle: 0,
                    threshold: -5,
                    ratio: 2,
                    attack: 0.2,
                    release: 0.2,
                },
                overdrive: {
                    toggle: 0,
                    gain: 10,
                    tone: 20000,
                    level: 1,
                },
                ampDrive: {
                    toggle: 0,
                    gain: 0,
                },
                eq: {
                    bassGain: 0,
                    midGain: 0,
                    trebleGain: 0,
                },
                masterVolume: 0,
                reverb: {
                    toggle: 0,
                    wetDry: 0,
                    type: 'spring',
                }
            }
        }
    }
})