<script setup lang="ts">
import { useGoods } from '~/store/goods'

const { getGood } = useGoods()
onMounted(() => getGood(+useRoute().params.id))
onServerPrefetch(() => getGood(+useRoute().params.id))
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientGood />
    <ClientMenu />
  </div>
</template>
