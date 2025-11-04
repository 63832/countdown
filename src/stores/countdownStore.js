import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCountdownStore = defineStore('countdown', () => {
    const events = ref([])

    const stored = localStorage.getItem('countdownEvents')
    if (stored) events.value = JSON.parse(stored)

    watch(events, (newVal) => {
        localStorage.setItem('countdownEvents', JSON.stringify(newVal))
    }, { deep: true })

    const addEvent = (event) => events.value.push(event)
    const removeEvent = (id) => {
        events.value = events.value.filter(e => e.id !== id)
    }

    return { events, addEvent, removeEvent }
})
