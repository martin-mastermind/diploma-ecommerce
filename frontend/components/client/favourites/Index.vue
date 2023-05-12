<script setup lang="ts">
const favourites = computed(() => [
  {
    id: 1,
    title: 'Банан',
    img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
    rating: {
      total: 4.5,
      total_reviews: 2
    }
  },
  {
    id: 2,
    title: 'Яблоко',
    img: '',
    rating: {
      total: 0,
      total_reviews: 0
    }
  }
])
</script>

<template>
  <article class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Список избранных товаров
    </h1>
    <section v-if="favourites.length > 0" class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <ClientUiCatalogItem v-for="favourite in favourites" :key="favourite.id" :good="favourite" />
    </section>
    <section v-else class="m-auto">
      <h2 class="text-xl lg:text-2xl">
        У Вас нет избранных товаров...
      </h2>
    </section>
  </article>
</template>
