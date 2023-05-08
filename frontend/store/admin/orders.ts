import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useOrders = defineStore('ordersStore', () => {
  const orders = ref<OrderPreview[]>([])
  const currentOrder = ref<Order | null>(null)

  async function getOrders () {
    const result = await useApi('/api/admin/orders/list').get()

    if (result === false) { return false }

    orders.value = result as OrderPreview[]
    return true
  }

  async function getOrder (id: number) {
    const result = await useApi(`/api/admin/orders/${id}`).get()

    if (result === false) { return false }

    currentOrder.value = result as Order

    return true
  }

  async function updateOrder (data: { id: number, status: 'new' | 'in-work' | 'success' | 'canceled' }) {
    const result = await useApi(`/api/admin/orders/${data.id}`, data).put()

    if (result === false) { return false }

    return true
  }

  return { orders, currentOrder, getOrders, getOrder, updateOrder }
})
