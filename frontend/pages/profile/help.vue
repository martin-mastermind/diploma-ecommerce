<script setup lang="ts">
import { useAppeals } from '~/store/client/appeals'

const { getAppeals } = useAppeals()
onMounted(getAppeals)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientProfileHeader />
    <LazyClientProfileAppeals />
  </div>
</template>
