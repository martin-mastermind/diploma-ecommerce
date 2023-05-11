<script setup lang="ts">
const goods = computed(() => [
  {
    id: 1,
    img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
    price: 2.45,
    title: 'Банан'
  },
  {
    id: 2,
    img: '',
    price: 1.89,
    title: 'Яблоко'
  },
  {
    id: 3,
    img: '',
    price: 3.50,
    title: 'Йогурт'
  }
])
</script>

<template>
  <article class="p-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Может Вас заинтересовать
    </h1>
    <section class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="good in goods" :key="good.id" class="flex flex-col gap-1 cursor-pointer">
        <img class="w-full aspect-square object-contain" :src="good.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
        <span class="text-blue-900 text-md font-bold">{{ good.price }} р.</span>
        <span class="text-lg">{{ good.title }}</span>
        <div class="flex gap-3 items-center">
          <div class="px-3 py-0.5 lg:px-4 lg:py-1 rounded-lg text-white bg-blue-800 cursor-pointer hover:bg-blue-900 active:bg-blue-950 transition-colors">
            <Icon name="material-symbols:shopping-cart-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
          </div>
          <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
            <Icon name="material-symbols:favorite-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
          </div>
          <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
            <Icon name="material-symbols:candlestick-chart-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
