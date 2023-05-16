import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useOrders = defineStore('ordersStore', () => {
  const orders = ref<Client.Order[]>([])

  async function getOrders () {
    const result = await useApi('/api/profile/orders/list').get()

    if (result === false) {
      orders.value = []
      return false
    }

    orders.value = result as Client.Order[]
    return true
  }

  async function cancelOrder (id: number) {
    const result = await useApi(`/api/profile/orders/${id}`).remove()

    return result
  }

  return { orders, getOrders, cancelOrder }
})
