<script setup lang="ts">
import { useFavourites } from '~/store/client/favourites'

const favouritesStore = useFavourites()
</script>

<template>
  <article v-if="favouritesStore.favourites" class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Список избранных товаров
    </h1>
    <section v-if="favouritesStore.favourites.length > 0" class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <ClientUiCatalogItem v-for="favourite in favouritesStore.favourites" :key="favourite.id" :good="favourite" />
    </section>
    <section v-else class="m-auto">
      <h2 class="text-xl lg:text-2xl">
        У Вас нет избранных товаров...
      </h2>
    </section>
  </article>
</template>
