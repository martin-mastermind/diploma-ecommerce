<script setup lang="ts">
const props = defineProps<{
  good: {
    id: number
    title: string
    img: string
    price?: number
    rating?: {
      total: number
      total_reviews: number
    }
  }
  needAddButton?: boolean
}>()

async function openGood () {
  await navigateTo(`/good/${props.good.id}`)
}
</script>

<template>
  <div class="flex flex-col gap-1 cursor-pointer p-5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors select-none" @click="openGood">
    <img class="w-full aspect-square object-contain max-h-96" :src="good.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
    <span v-if="good.price" class="text-blue-900 text-md font-bold">{{ good.price }} р.</span>
    <div class="flex gap-2">
      <span class="text-lg font-bold">{{ good.title }}</span>
      <div v-if="good.rating" class="flex gap-2 items-center">
        <ClientUiStars :rating="good.rating.total" />
        <span class="text-sm">{{ good.rating.total_reviews }}</span>
      </div>
    </div>
    <div class="flex gap-3 items-center">
      <div v-if="needAddButton" class="px-3 py-0.5 lg:px-4 lg:py-1 rounded-lg text-white bg-blue-800 cursor-pointer hover:bg-blue-900 active:bg-blue-950 transition-colors">
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
</template>
