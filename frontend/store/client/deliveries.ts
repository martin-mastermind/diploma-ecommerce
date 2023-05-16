import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useDeliveries = defineStore('deliveriesStore', () => {
  const deliveries = ref<Client.UserDeliveryFull[]>([])
  const currentDelivery = ref<Client.UserDeliveryFull | null>(null)

  async function getDeliveries () {
    const result = await useApi('/api/profile/deliveries/list').get()

    if (result === false) {
      deliveries.value = []
      return false
    }

    deliveries.value = result as Client.UserDeliveryFull[]
    return true
  }

  function selectDelivery (id: number) {
    currentDelivery.value = deliveries.value.find(d => d.id === id) ?? null
  }

  async function removeDelivery (id: number) {
    const result = await useApi(`/api/profile/deliveries/${id}`).remove()

    if (result === false) { return false }

    return true
  }

  async function updateDelivery (delivery: Client.UserDeliveryFull) {
    const result = await useApi(`/api/profile/deliveries/${delivery.id}`, { ...delivery }).put()

    if (result === false) { return false }

    return true
  }

  async function addDelivery (delivery: Client.UserDeliveryFull) {
    const result = await useApi('/api/profile/deliveries/new', { ...delivery }).post()

    if (result === false) { return false }

    return true
  }

  return { deliveries, currentDelivery, getDeliveries, selectDelivery, removeDelivery, updateDelivery, addDelivery }
})
