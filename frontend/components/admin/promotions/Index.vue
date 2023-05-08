<script setup lang="ts">
import { usePromotions } from '~/store/admin/promotions'

const promotionsStore = usePromotions()
onMounted(promotionsStore.getPromotions)
onServerPrefetch(promotionsStore.getPromotions)

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
      <h1>Список акций</h1>
      <AdminUiControlButton name="material-symbols:add-rounded" @click="openModal(0)" />
    </header>
    <AdminPromotionsTable @open-modal="openModal" />
    <LazyAdminPromotionsModal :id="modalState.id" v-model:is-opened="modalState.isOpen" @refetch-list="promotionsStore.getPromotions" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
