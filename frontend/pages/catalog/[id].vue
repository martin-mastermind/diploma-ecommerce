<script setup lang="ts">
import { useCatalog } from '~/store/client/catalog'

const { getCatalogById } = useCatalog()

const id = +useRoute().params.id
onMounted(() => getCatalogById(id))
onServerPrefetch(() => getCatalogById(id))
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientCatalog />
    <ClientMenu />
  </div>
</template>
