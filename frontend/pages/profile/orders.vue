<script setup lang="ts">
import { useOrders } from '~/store/client/orders'

const { getOrders } = useOrders()
onMounted(getOrders)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientProfileHeader />
    <LazyClientProfileOrders />
  </div>
</template>
