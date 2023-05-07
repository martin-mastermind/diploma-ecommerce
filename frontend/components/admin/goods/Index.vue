<script setup lang="ts">
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
      <h1>
        Список товаров
      </h1>
      <AdminUiControlButton name="material-symbols:add-rounded" />
    </header>
    <AdminGoodsTable @open-modal="openModal" />
    <LazyAdminGoodsModal :id="modalState.id" v-model:is-opened="modalState.isOpen" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
