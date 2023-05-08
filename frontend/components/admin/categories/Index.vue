<script setup lang="ts">
import { useCategories } from '~/store/admin/categories'

const categoriesStore = useCategories()
onMounted(categoriesStore.getCategories)
onServerPrefetch(categoriesStore.getCategories)

const modalState = ref({
  isOpen: false,
  id: 0
})

function openModal (id: number) {
  modalState.value.isOpen = true
  modalState.value.id = id
}
</script>

<template>
  <main class="p-5 w-full">
    <header class="flex gap-2 items-center text-3xl">
      <h1>Список категорий</h1>
      <AdminUiControlButton name="material-symbols:add-rounded" @click="openModal(0)" />
    </header>
    <AdminCategoriesTable @open-modal="openModal" />
    <LazyAdminCategoriesModal :id="modalState.id" v-model:is-opened="modalState.isOpen" @refetch-list="categoriesStore.getCategories" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
