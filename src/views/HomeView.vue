<script setup>
import { computed } from 'vue'
import { useCountdownStore } from '@/stores/countdownStore'
import CountdownForm from '@/components/CountdownForm.vue'
import CountdownItem from '@/components/CountdownItem.vue'

const store = useCountdownStore()

const sortedEvents = computed(() =>
  [...store.events].sort((a, b) => new Date(a.end) - new Date(b.end)),
)
</script>

<template>
  <div class="home-container">
    <CountdownForm />

    <div class="countdown-list">
      <CountdownItem v-for="event in sortedEvents" :key="event.id" :event="event" />
    </div>
  </div>
</template>
