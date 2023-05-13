<script setup lang="ts">
const menuItems = computed(() => [
  {
    id: 1,
    icon: 'material-symbols:home-outline-rounded',
    title: 'Главная',
    link: '/'
  },
  {
    id: 2,
    icon: 'material-symbols:shopping-cart-outline-rounded',
    title: 'Корзина',
    link: '/cart'
  },
  {
    id: 3,
    icon: 'material-symbols:favorite-outline-rounded',
    title: 'Избранное',
    link: '/favourites'
  },
  {
    id: 4,
    icon: 'material-symbols:candlestick-chart-outline-rounded',
    title: 'Сравнение',
    link: '/comparison'
  },
  {
    id: 5,
    icon: 'material-symbols:person-outline-rounded',
    title: 'Профиль'
  }
])

const isAuthModalOpened = ref(false)

function openAuthModal (id: number) {
  if (id !== 5) { return }
  isAuthModalOpened.value = true
}
</script>

<template>
  <nav class="w-full z-10 mt-auto pt-1 sticky bottom-0 bg-white flex sm:gap-5 justify-center transition-all md:gap-10">
    <ClientMenuItem
      v-for="item in menuItems"
      :key="item.id"
      :icon="item.icon"
      :title="item.title"
      :link="item.link"
      @click="openAuthModal(item.id)"
    />
    <ClientMenuAuthModal v-model:is-opened="isAuthModalOpened" />
  </nav>
</template>
