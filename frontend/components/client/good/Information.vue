<script setup lang="ts">
defineProps<{
  good: Client.Good
}>()
</script>

<template>
  <section class="px-2 lg:px-10 flex flex-col gap-5">
    <div class="flex gap-2 items-center">
      <ClientUiStars :rating="good.rating.total" />
      <span class="text-sm">{{ good.rating.reviews!.length }}</span>
    </div>
    <div class="flex">
      <img class=" aspect-square object-contain max-h-96" :src="good.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
    </div>
    <div class="flex gap-2">
      <span class="text-sm text-gray-500">{{ good.origin_country }}</span>
      <span class="text-sm text-gray-500">Артикул: {{ good.vendor_code }}</span>
    </div>
    <div class="flex flex-col gap-1 justify-center">
      <h2 class="text-2xl font-bold">
        {{ good.price }} р.
      </h2>
      <span>Фасовка: {{ good.weight }}</span>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-xl font-bold">
        Описание товара
      </h2>
      <p class="block max-h-96 overflow-auto">
        {{ good.description }}
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-xl font-bold">
        Характеристика товара
      </h2>
      <p class="block max-h-96 overflow-auto whitespace-pre-wrap">
        {{ good.characteristic }}
      </p>
    </div>
  </section>
</template>
