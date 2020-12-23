import { createRouter, createWebHistory } from '@ionic/vue-router';
import MemoriesPage from '../pages/MemoriesPage.vue'
import Home from '../pages/Home.vue'


const routes= [
  {
    path: '/',
    component: Home
  },
  {
    path: '/memories',
    component: MemoriesPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
