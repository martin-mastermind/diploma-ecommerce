<script setup lang="ts">
import { useComparison } from '~/store/client/comparison'

const { getComparison } = useComparison()

onMounted(getComparison)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientComparison />
    <ClientMenu />
  </div>
</template>
