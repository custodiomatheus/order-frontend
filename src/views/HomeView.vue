<template>
  <main class="flex w-full h-[calc(100vh-4rem)] items-center justify-center">
    <router-link
      :to="{ name: 'orders.details', params: { id: 1 } }"
      class="btn bg-primary-500 text-white p-2 rounded-lg hover:opacity-80 transition-opacity ease-in-out"
    >
      Ver ordem
    </router-link>
  </main>
</template>
