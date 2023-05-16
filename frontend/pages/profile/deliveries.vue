<script setup lang="ts">
import { useDeliveries } from '~/store/client/deliveries'

const { getDeliveries } = useDeliveries()
onMounted(getDeliveries)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientProfileHeader />
    <LazyClientProfileDeliveries />
  </div>
</template>
