<script setup>
import { ref } from 'vue'
import { useCountupStore } from '@/stores/countupStore'

const store = useCountupStore()

const title = ref('')
const startDate = ref('')

const addEvent = () => {
  if (!title.value || !startDate.value) return

  store.addEvent({
    id: Date.now(),
    title: title.value,
    start: startDate.value,
  })

  title.value = ''
  startDate.value = ''
}
</script>

<template>
  <form @submit.prevent="addEvent" class="form">
    <div class="form-row">
      <input id="title" v-model="title" type="text" placeholder="Event title" />
    </div>

    <div class="form-row">
      <input id="start" v-model="startDate" type="datetime-local" />
    </div>

    <button type="submit">Add Countup Event</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #3730a3;
}
</style>
