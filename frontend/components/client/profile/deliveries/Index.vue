<script setup lang="ts">
import { useDeliveries } from '~/store/client/deliveries'

const deliveriesStore = useDeliveries()

const deliveryOption = computed(() => {
  return (delivery: Client.UserDeliveryFull) => {
    return `г.${delivery.city}, ул.${delivery.street} ${delivery.house}, п.${delivery.entrance}, эт.${delivery.floor}, кв.${delivery.apartment}`
  }
})

const isOpened = ref(false)

function toggleModal (id?: number) {
  deliveriesStore.selectDelivery(id ?? 0)

  isOpened.value = true
}

async function askDelete (id: number) {
  if (!id) { return }

  if (!confirm('Вы уверены?')) { return }

  await deliveriesStore.removeDelivery(id)
  deliveriesStore.getDeliveries()
}
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Адреса доставки
    </h1>
    <div class="flex flex-col gap-2 justify-center">
      <div v-for="delivery in deliveriesStore.deliveries" :key="delivery.id" class="md:text-xl p-5 border-b border-blue-950 flex items-center justify-between">
        {{ deliveryOption(delivery) }}
        <div class="w-1/4 flex gap-1 justify-center">
          <ClientUiIconButton name="material-symbols:edit-rounded" @click="toggleModal(delivery.id)" />
          <ClientUiIconButton name="material-symbols:delete-outline-rounded" @click="askDelete(delivery.id)" />
        </div>
      </div>
    </div>
    <button class="w-full p-2 fixed left-0 bottom-0 text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 outline-none transition-all" @click="toggleModal()">
      Добавить
    </button>

    <ClientProfileDeliveriesModal v-model:is-opened="isOpened" />
  </article>
</template>
