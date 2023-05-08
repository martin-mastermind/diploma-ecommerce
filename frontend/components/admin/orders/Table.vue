<script setup lang="ts">
import { useOrders } from '~/store/admin/orders'

const emit = defineEmits(['openModal'])

const ordersStore = useOrders()
</script>

<template>
  <table class="mt-10 text-xl overflow-auto w-full border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          ID
        </th>
        <th class="p-2">
          Имя заказчика
        </th>
        <th class="p-2 w-1/4" />
      </tr>
    </thead>
    <tbody v-if="ordersStore.orders.length > 0">
      <tr v-for="order in ordersStore.orders" :key="order.id" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ order.id }}
        </td>
        <td class="p-2">
          {{ order.user.name }}
        </td>
        <td class="text-center">
          <button class="cursor-pointer hover:bg-slate-300 rounded-lg active:bg-slate-400 p-2 transition-colors" @click="emit('openModal', order.id)">
            Показать подробности
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
