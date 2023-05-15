<script setup lang="ts">
import { useGoods } from '~/store/client/goods'

const goodsStore = useGoods()

onMounted(goodsStore.getBaseGoods)
onServerPrefetch(goodsStore.getBaseGoods)
</script>

<template>
  <article v-if="goodsStore.baseGoods.length > 0" class="p-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Может Вас заинтересовать
    </h1>
    <section class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <ClientUiCatalogItem v-for="good in goodsStore.baseGoods" :key="good.id" :good="good" :need-add-button="true" />
    </section>
  </article>
</template>
