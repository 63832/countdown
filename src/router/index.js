import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CountupView from '@/views/CountupView.vue'

const routes = [
    { path: '/', name: 'Countdown', component: HomeView },
    { path: '/countup', name: 'Countup', component: CountupView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
