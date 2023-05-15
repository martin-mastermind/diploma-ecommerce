<script setup lang="ts">
import { usePromotions } from '~/store/client/promotions'

const { getPromotion } = usePromotions()
onMounted(() => getPromotion(+useRoute().params.id))
onServerPrefetch(() => getPromotion(+useRoute().params.id))
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientPromotion />
    <ClientMenu />
  </div>
</template>
