<script setup lang="ts">
const menuItems = computed(() => [
  {
    id: 1,
    icon: 'material-symbols:person-outline-rounded',
    title: 'Личные данные',
    link: '/profile'
  },
  {
    id: 2,
    icon: 'material-symbols:inbox-customize-outline-rounded',
    title: 'Адреса доставки',
    link: '/profile/deliveries'
  },
  {
    id: 3,
    icon: 'material-symbols:file-copy-outline-rounded',
    title: 'Заказы',
    link: '/profile/orders'
  },
  {
    id: 4,
    icon: 'mingcute:coupon-line',
    title: 'Акции и купоны',
    link: '/profile/promotions'
  },
  {
    id: 5,
    icon: 'material-symbols:help-center-outline-rounded',
    title: 'Тех.поддержка',
    link: '/profile/help'
  },
  {
    id: 6,
    icon: 'material-symbols:logout-rounded',
    title: 'Выйти'
  }
])
</script>

<template>
  <header class="py-2 flex flex-col items-center gap-2 md:flex-row md:px-2 md:gap-5">
    <ClientUiLogo />
    <nav class="w-full flex flex-wrap gap-1 md:gap-3 lg:gap-5 justify-center items-center transition-all">
      <ClientUiMenuItem
        v-for="item in menuItems"
        :key="item.id"
        :icon="item.icon"
        :title="item.title"
        :link="item.link"
      />
    </nav>
  </header>
</template>
