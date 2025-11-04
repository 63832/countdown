<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCountupStore } from '@/stores/countupStore'

const props = defineProps({ event: Object })
const store = useCountupStore()

const remove = () => store.removeEvent(props.event.id)

const elapsed = ref({})
let interval = null

const updateElapsed = () => {
  const now = new Date()
  const start = new Date(props.event.start)
  let diff = now - start
  if (diff < 0) diff = 0

  const seconds = Math.floor(diff / 1000) % 60
  const minutes = Math.floor(diff / (1000 * 60)) % 60
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  elapsed.value = { days, hours, minutes, seconds }
}

onMounted(() => {
  updateElapsed()
  interval = setInterval(updateElapsed, 1000)
})

onUnmounted(() => clearInterval(interval))

const elapsedText = computed(() => {
  const e = elapsed.value
  return e.days + 'd ' + e.hours + 'h ' + e.minutes + 'm ' + e.seconds + 's'
})
</script>

<template>
  <div class="countdown-card">
    <div class="title-row">
      <h2>{{ event.title }}</h2>
      <button @click="remove">Delete</button>
    </div>
    <p>{{ elapsedText }}</p>
  </div>
</template>

<style scoped>
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

.countdown-card button {
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.countdown-card button:hover {
  background-color: #c53030;
}
</style>
