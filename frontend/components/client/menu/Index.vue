<script setup lang="ts">
import { useAuthModal } from '~/composables/client/useAuthModal'
import { useUser } from '~/store/client/user'

const { openModal, changeModalType } = useAuthModal()
const { user, verifyUser } = useUser()

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
    title: user?.name ?? 'Профиль',
    link: '/profile'
  }
])

const onlyAuthItems = [2, 3, 5]

async function checkForAuth (id: number, link: string) {
  const hasAuth = await verifyUser()

  if (!hasAuth && onlyAuthItems.includes(id)) {
    changeModalType('login')
    openModal()
    return
  }

  await navigateTo(link)
}
</script>

<template>
  <nav class="w-full z-10 mt-auto pt-1 sticky bottom-0 bg-white flex sm:gap-5 justify-center transition-all md:gap-10">
    <ClientUiMenuItem
      v-for="item in menuItems"
      :key="item.id"
      :icon="item.icon"
      :title="item.title"
      :link="item.link"
      :additional-check="true"
      @click="checkForAuth(item.id, item.link)"
    />
    <LazyClientAuth />
  </nav>
</template>
