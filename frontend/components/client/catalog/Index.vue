<script setup lang="ts">
const categoryTitle = computed(() => 'Фрукты и овощи')

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
  <article class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <NuxtLink to="/catalog" class="flex gap-2 items-center mb-5">
      <Icon name="material-symbols:arrow-back-ios-new-rounded" size="1.25rem" />
      <h1 class="text-2xl lg:text-3xl font-bold">
        {{ categoryTitle }}
      </h1>
    </NuxtLink>
    <ClientCatalogMenu />
    <section v-if="goods.length > 0" class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <ClientUiCatalogItem v-for="good in goods" :key="good.id" :good="good" :need-add-button="true" />
    </section>
    <section v-else class="m-auto">
      <h2 class="text-xl lg:text-2xl">
        Нет товаров в данной категории
      </h2>
    </section>
  </article>
</template>
