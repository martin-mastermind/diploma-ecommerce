<script setup lang="ts">

const orders = ref([
  {
    id: 1,
    total: 8.5,
    delivery_date: '14.05.2023',
    delivery_from_time: '14:00',
    delivery_to_time: '18:00',
    status: 'new' as 'new' | 'in-work' | 'success' | 'canceled'
  }
])

const orderStatus = computed(() => (status: 'new' | 'in-work' | 'success' | 'canceled') => {
  const statuses = {
    new: 'Новый',
    'in-work': 'В работе',
    success: 'Завершен',
    canceled: 'Отменен'
  }

  return statuses[status]
})

function cancelOrder (id?: number) {
  if (!id) { return }

  if (!confirm('Вы уверены?')) { return }

  alert('Заказ отменен!')
}
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Список заказов
    </h1>
    <div class="flex flex-col gap-2 justify-center lg:gap-10">
      <div v-for="order in orders" :key="order.id" class="p-5 border-b border-blue-950 flex items-center justify-between">
        <div class="flex gap-2 flex-col md:gap-4">
          <span class="text-lg md:text-xl font-bold">Заказ №{{ order.id }}</span>
          <span class="text-sm md:text-lg">Общая стоимость: {{ order.total }} р.</span>
          <span class="text-sm md:text-lg">Дата доставки: {{ order.delivery_date }} c {{ order.delivery_from_time }} до {{ order.delivery_to_time }}</span>
          <span class="text-lg md:text-xl font-bold">{{ orderStatus(order.status) }}</span>
        </div>
        <div v-if="order.status === 'new'" class="w-1/4 flex gap-1 justify-center">
          <ClientUiIconButton name="material-symbols:close-rounded" @click="cancelOrder(order.id)" />
        </div>
      </div>
    </div>
  </article>
</template>
