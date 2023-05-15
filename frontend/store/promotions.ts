import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const usePromotions = defineStore('promotionsStore', () => {
  const promotions = ref<Client.PromotionPreview[]>([])
  const currentPromotion = ref<Client.Promotion | null>(null)

  async function getPromotions () {
    const result = await useApi('/api/promotions/list').get()

    if (result === false) { return false }

    promotions.value = result as Client.PromotionPreview[]
    return true
  }

  async function getPromotion (id: number) {
    const result = await useApi(`/api/promotions/${id}`).get()

    if (result === false) { return false }

    currentPromotion.value = result as Client.Promotion

    return true
  }

  return { promotions, currentPromotion, getPromotions, getPromotion }
})
