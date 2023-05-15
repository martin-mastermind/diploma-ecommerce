<script setup lang="ts">
import { usePromotions } from '~/store/promotions'

const { promotions, getPromotions } = usePromotions()

onActivated(getPromotions)
onServerPrefetch(getPromotions)
</script>

<template>
  <article v-if="promotions.length > 0" class="p-2 flex flex-col gap-1 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Акции
    </h1>
    <ClientBasePromotionsCarousel :items="promotions" />
  </article>
</template>
