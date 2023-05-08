<script setup lang="ts">
import { useAppeals } from '~/store/admin/appeals'

const appealsStore = useAppeals()
onMounted(appealsStore.getAppeals)
onServerPrefetch(appealsStore.getAppeals)

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
      <h1>Список обращений</h1>
    </header>
    <AdminAppealsTable @open-modal="openModal" />
    <LazyAdminAppealsModal :id="modalState.id" v-model:is-opened="modalState.isOpen" @refetch-list="appealsStore.getAppeals" />
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: content;
}
</style>
