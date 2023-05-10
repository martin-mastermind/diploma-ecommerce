<script setup lang="ts">
const menuItems = computed(() => [
  {
    id: 1,
    icon: 'material-symbols:home-outline-rounded',
    title: 'Главная'
  },
  {
    id: 2,
    icon: 'material-symbols:shopping-cart-outline-rounded',
    title: 'Корзина'
  },
  {
    id: 3,
    icon: 'material-symbols:favorite-outline-rounded',
    title: 'Избранное'
  },
  {
    id: 4,
    icon: 'material-symbols:candlestick-chart-outline-rounded',
    title: 'Сравнение'
  },
  {
    id: 5,
    icon: 'material-symbols:person-outline-rounded',
    title: 'Профиль'
  }
])
</script>

<template>
  <nav class="pt-1 sticky bottom-0 bg-white flex gap-2 justify-center transition-all md:gap-10">
    <ClientMenuItem v-for="item in menuItems" :key="item.id" :icon="item.icon" :title="item.title" />
  </nav>
</template>

<style lang="scss" scoped>
  nav {
    grid-area: menu;
  }
</style>
