<script setup lang="ts">
import { useComparison } from '~/store/comparison'

const { getComparison } = useComparison()

onMounted(getComparison)
onServerPrefetch(getComparison)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <ClientComparison />
    <ClientMenu />
  </div>
</template>
