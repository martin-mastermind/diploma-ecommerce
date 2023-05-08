<script setup lang="ts">
import { useOrders } from '~/store/admin/orders'

const ordersStore = useOrders()
onMounted(ordersStore.getOrders)
onServerPrefetch(ordersStore.getOrders)

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
      <h1>Список заказов</h1>
    </header>
    <AdminOrdersTable @open-modal="openModal" />
    <LazyAdminOrdersModal :id="modalState.id" v-model:is-opened="modalState.isOpen" @refetch-list="ordersStore.getOrders" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
