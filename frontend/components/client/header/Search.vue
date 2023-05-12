<script setup lang="ts">
const query = ref('')

async function searchGoods () {
  await navigateTo(`/catalog/search/${query.value}`)
}
</script>

<template>
  <div class="relative w-2/3 md:w-full">
    <input id="search" v-model="query" class="w-full p-2 border border-blue-900 rounded-md outline-none" type="text" placeholder="Поиск">
    <Icon class="absolute z-10 right-1 top-1/2 -translate-y-1/2 text-blue-900 lg:w-7 lg:h-7 cursor-pointer" name="material-symbols:search" size="1.5rem" @click="searchGoods" />
  </div>
</template>
