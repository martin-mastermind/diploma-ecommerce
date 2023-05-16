<script setup lang="ts">

import { useOrders } from '~/store/client/orders'

const ordersStore = useOrders()

const orderStatus = computed(() => (status: 'new' | 'in-work' | 'success' | 'canceled') => {
  const statuses = {
    new: 'Новый',
    'in-work': 'В работе',
    success: 'Завершен',
    canceled: 'Отменен'
  }

  return statuses[status]
})

async function askCancel (id?: number) {
  if (!id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await ordersStore.cancelOrder(id)) { return }
  await ordersStore.getOrders()
}
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Список заказов
    </h1>
    <section class="flex flex-col gap-2 justify-center lg:gap-10">
      <div v-for="order in ordersStore.orders" :key="order.id" class="p-5 border-b border-blue-950 flex items-center justify-between">
        <div class="flex gap-2 flex-col md:gap-4">
          <span class="text-lg md:text-xl font-bold">Заказ №{{ order.id }}</span>
          <span class="text-sm md:text-lg">Общая стоимость: {{ order.total }} р.</span>
          <span class="text-sm md:text-lg">Дата доставки: {{ order.delivery_date }} c {{ order.delivery_from_time }} до {{ order.delivery_to_time }}</span>
          <span class="text-lg md:text-xl font-bold">{{ orderStatus(order.status) }}</span>
        </div>
        <div v-if="order.status === 'new'" class="w-1/4 flex gap-1 justify-center">
          <ClientUiIconButton name="material-symbols:close-rounded" @click="askCancel(order.id)" />
        </div>
      </div>
    </section>
  </article>
</template>
