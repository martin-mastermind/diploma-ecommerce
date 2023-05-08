<script setup lang="ts">
import { useCoupons } from '~/store/admin/coupons'

const couponsStore = useCoupons()
onMounted(couponsStore.getCoupons)
onServerPrefetch(couponsStore.getCoupons)

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
      <h1>Список купонов</h1>
      <AdminUiControlButton name="material-symbols:add-rounded" @click="openModal(0)" />
    </header>
    <AdminCouponsTable @open-modal="openModal" />
    <LazyAdminCouponsModal :id="modalState.id" v-model:is-opened="modalState.isOpen" @refetch-list="couponsStore.getCoupons" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
