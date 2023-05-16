<script setup lang="ts">
import { useEvent } from '~/composables/utils/useEventBus'
import { useDeliveries } from '~/store/client/deliveries'

const deliveriesStore = useDeliveries()

const deliveryOption = computed(() => {
  return (delivery: Client.UserDeliveryFull) => {
    return `г.${delivery.city}, ул.${delivery.street} ${delivery.house}, п.${delivery.entrance}, эт.${delivery.floor}, кв.${delivery.apartment}`
  }
})

onMounted(deliveriesStore.getDeliveries)

const selectedDelivery = ref<number | null>(null)
watch(selectedDelivery, () => {
  if (!selectedDelivery.value) { return }

  useEvent('cart:update', {
    userDelivery: selectedDelivery.value
  })
})

const isOpened = ref(false)

function addDelivery () {
  deliveriesStore.selectDelivery(0)
  isOpened.value = true
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <header class="flex gap-2 items-center">
      <h3 class="text-xl lg:text-2xl font-bold">
        Адрес доставки
      </h3>
      <ClientUiIconButton name="material-symbols:add-circle-outline-rounded" @click="addDelivery" />
    </header>
    <select v-model="selectedDelivery" class="p-2 rounded-lg border border-blue-950">
      <option v-for="delivery in deliveriesStore.deliveries" :key="delivery.id" :value="delivery.id">
        {{ deliveryOption(delivery) }}
      </option>
    </select>

    <ClientProfileDeliveriesModal v-model:is-opened="isOpened" class="z-20" />
  </section>
</template>
