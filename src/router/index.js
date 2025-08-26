import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/orders/:id',
      name: 'orders.details',
      component: () => import('@/views/OrderDetails.vue'),
    },
  ],
})

export default router
