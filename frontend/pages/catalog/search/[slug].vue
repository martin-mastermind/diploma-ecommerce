<script setup lang="ts">
import { useCatalog } from '~/store/client/catalog'

const { getCatalogBySlug } = useCatalog()

const slug = useRoute().params.slug as string
onMounted(() => getCatalogBySlug(slug))
onServerPrefetch(() => getCatalogBySlug(slug))
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <ClientCatalog />
    <ClientMenu />
  </div>
</template>
