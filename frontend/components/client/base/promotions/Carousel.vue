<script setup lang="ts">
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const promotions = computed(() => [
  {
    id: 1,
    img: 'https://www.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg'
  },
  {
    id: 2,
    img: 'https://cdn.w600.comps.canstockphoto.com/promotion-stock-photography_csp28013105.jpg'
  },
  {
    id: 3,
    img: 'https://t4.ftcdn.net/jpg/02/62/03/53/360_F_262035364_gGi8uJsPl9uljis8C6oxI0w6AM7MKDLq.jpg'
  }
])

</script>

<template>
  <Carousel :autoplay="5000" :wrap-around="true">
    <Slide v-for="promotion in promotions" :key="promotion.id">
      <div class="h-40 flex items-center justify-center">
        <img class="w-full h-auto inline-block object-contain" :src="promotion.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>
