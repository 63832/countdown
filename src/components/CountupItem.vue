<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCountupStore } from '@/stores/countupStore'

const props = defineProps({ event: Object })
const store = useCountupStore()

const remove = () => store.removeEvent(props.event.id)

// Use computed to track stopped state from store
const currentEvent = computed(() => store.events.find((e) => e.id === props.event.id))

const elapsed = ref(props.event.elapsed || 0)
let interval = null

const startTimer = () => {
  interval = setInterval(() => {
    elapsed.value =
      new Date() - new Date(currentEvent.value.start) + (currentEvent.value.elapsed || 0)
  }, 1000)
}

const stopTimer = () => {
  clearInterval(interval)
  store.events = store.events.map((e) => {
    if (e.id === props.event.id) {
      return {
        ...e,
        stopped: true,
        elapsed: elapsed.value,
      }
    }
    return e
  })
}

const continueTimer = () => {
  store.events = store.events.map((e) => {
    if (e.id === props.event.id) {
      return {
        ...e,
        stopped: false,
        start: new Date().toISOString(),
      }
    }
    return e
  })
  elapsed.value = currentEvent.value.elapsed || 0
  startTimer()
}

onMounted(() => {
  if (!currentEvent.value.stopped) startTimer()
})

onUnmounted(() => clearInterval(interval))

const elapsedText = computed(() => {
  let ms = elapsed.value

  const secondsTotal = Math.floor(ms / 1000)
  const years = Math.floor(secondsTotal / (365 * 24 * 3600))
  ms -= years * 365 * 24 * 3600 * 1000

  const months = Math.floor(secondsTotal / (30 * 24 * 3600)) % 12
  ms -= months * 30 * 24 * 3600 * 1000

  const weeks = Math.floor(secondsTotal / (7 * 24 * 3600)) % 4
  ms -= weeks * 7 * 24 * 3600 * 1000

  const days = Math.floor(secondsTotal / (24 * 3600)) % 7
  ms -= days * 24 * 3600 * 1000

  const hours = Math.floor(secondsTotal / 3600) % 24
  const minutes = Math.floor(secondsTotal / 60) % 60
  const seconds = secondsTotal % 60

  return `${years} years ${months} months ${weeks} weeks ${days} days ${hours} hours ${minutes} min ${seconds} sec`
})
</script>

<template>
  <div class="countdown-card">
    <div class="title-row">
      <h2>{{ event.title }}</h2>
      <button class="delete-btn" @click="remove">Delete</button>
    </div>

    <p>{{ elapsedText }}</p>

    <div class="button-row">
      <button v-if="!currentEvent.stopped" @click="stopTimer" class="stop-btn">Stop</button>
      <button v-else @click="continueTimer" class="continue-btn">Continue</button>
    </div>
  </div>
</template>

<style scoped>
.delete-btn {
  background-color: #e53e3e; /* red */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c53030; /* darker red on hover */
}
.countdown-card {
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.countdown-card h2 {
  margin: 0;
  font-size: 1.2rem;
}

.button-row {
  display: flex;
  gap: 0.5rem;
}

.stop-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.stop-btn:hover {
  background-color: #c53030;
}

.continue-btn {
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.continue-btn:hover {
  background-color: #3730a3;
}
</style>
