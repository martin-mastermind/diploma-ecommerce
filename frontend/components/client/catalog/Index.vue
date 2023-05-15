<script setup lang="ts">
import { useCatalog } from '~/store/client/catalog'

const catalogStore = useCatalog()
</script>

<template>
  <article v-if="catalogStore.formattedCatalog" class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <NuxtLink to="/catalog" class="flex gap-2 items-center mb-5 w-fit">
      <Icon name="material-symbols:arrow-back-ios-new-rounded" size="1.25rem" />
      <h1 class="text-2xl lg:text-3xl font-bold">
        {{ catalogStore.formattedCatalog.title }}
      </h1>
    </NuxtLink>
    <ClientCatalogMenu />
    <section v-if="catalogStore.formattedCatalog.goods.length > 0" class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      <ClientUiCatalogItem v-for="good in catalogStore.formattedCatalog.goods" :key="good.id" :good="good" :need-add-button="true" />
    </section>
    <section v-else class="m-auto">
      <h2 class="text-xl lg:text-2xl">
        Нет товаров в данной категории
      </h2>
    </section>
  </article>
</template>
