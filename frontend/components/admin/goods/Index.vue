<script setup lang="ts">
import { useGoods } from '~/store/admin/goods'

const goodsStore = useGoods()
onServerPrefetch(goodsStore.getGoods)

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
    <LazyAdminGoodsModal :id="modalState.id" v-model:is-opened="modalState.isOpen" @refetch-list="goodsStore.getGoods" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
