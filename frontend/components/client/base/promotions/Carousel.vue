<script setup lang="ts">
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

defineProps<{
  items: Client.PromotionPreview[]
}>()

</script>

<template>
  <Carousel :autoplay="5000" :wrap-around="true">
    <Slide v-for="item in items" :key="item.id">
      <div class="h-40 md:h-60 lg:h-80 flex items-center justify-center cursor-pointer" @click="navigateTo(`/promotion/${item.id}`)">
        <img class="w-full h-auto inline-block object-contain" :src="item.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>
