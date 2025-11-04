<script setup>
import { useCountupStore } from '@/stores/countupStore'
import CountupForm from '@/components/CountupForm.vue'
import CountupItem from '@/components/CountupItem.vue'

const store = useCountupStore()
</script>

<template>
  <div class="countup-view">
    <CountupForm />

    <div class="countup-list">
      <CountupItem v-for="event in store.events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.countup-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.countup-view h1 {
  text-align: center;
  color: blueviolet;
  margin-bottom: 2rem;
}

.countup-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
