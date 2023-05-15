<script setup lang="ts">
import { useCatalog } from '~/store/catalog'

const { getCategories } = useCatalog()

onMounted(getCategories)
onServerPrefetch(getCategories)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <ClientCatalogCategories />
    <ClientMenu />
  </div>
</template>
