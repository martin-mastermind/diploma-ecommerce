<script setup lang="ts">
import { useFavourites } from '~/store/client/favourites'

const { getFavourites } = useFavourites()

onMounted(getFavourites)
onServerPrefetch(getFavourites)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientFavourites />
    <ClientMenu />
  </div>
</template>
