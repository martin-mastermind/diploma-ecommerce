<script setup lang="ts">
import { useCatalog } from '~/store/client/catalog'

const { getCategories } = useCatalog()

onMounted(getCategories)
onServerPrefetch(getCategories)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientCatalogCategories />
    <ClientMenu />
  </div>
</template>
