<script setup lang="ts">
const favourites = computed(() => [
  {
    id: 1,
    title: 'Банан',
    img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg'
  },
  {
    id: 2,
    title: 'Яблоко',
    img: ''
  }
])
</script>

<template>
  <article class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Список избранных товаров
    </h1>
    <section v-if="favourites.length > 0" class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="favourite in favourites" :key="favourite.id" class="flex flex-col gap-1 cursor-pointer p-5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors select-none">
        <img class="w-full aspect-square object-contain max-h-96" :src="favourite.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
        <span class="text-lg font-bold">{{ favourite.title }}</span>
        <div class="flex gap-3 items-center">
          <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
            <Icon name="material-symbols:favorite-outline-rounded" size="1.5rem" class="text-red-600 lg:w-7 lg:h-7" />
          </div>
          <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
            <Icon name="material-symbols:candlestick-chart-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
          </div>
        </div>
      </div>
    </section>
    <section v-else class="m-auto">
      <h2 class="text-xl lg:text-2xl">
        У Вас нет избранных товаров...
      </h2>
    </section>
  </article>
</template>
