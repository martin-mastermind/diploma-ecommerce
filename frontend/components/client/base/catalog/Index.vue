<script setup lang="ts">
const goods = computed(() => [
  {
    id: 1,
    title: 'Банан',
    img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
    price: 2.5,
    rating: {
      total: 4.5,
      total_reviews: 2
    }
  },
  {
    id: 2,
    title: 'Яблоко',
    img: '',
    price: 1.89,
    rating: {
      total: 0,
      total_reviews: 0
    }
  }
])
</script>

<template>
  <article class="p-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Может Вас заинтересовать
    </h1>
    <section class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <ClientUiCatalogItem v-for="good in goods" :key="good.id" :good="good" :need-add-button="true" />
    </section>
  </article>
</template>
