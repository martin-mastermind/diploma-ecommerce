import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const usePromotions = defineStore('promotionsStore', () => {
  const promotions = ref<PromotionPreview[]>([])
  const currentPromotion = ref<Promotion | null>(null)

  async function getPromotions () {
    const result = await useApi('/api/admin/promotions/list').get()

    if (result === false) { return false }

    promotions.value = result as PromotionPreview[]
    return true
  }

  async function getPromotion (id: number) {
    const result = await useApi(`/api/admin/promotions/${id}`).get()

    if (result === false) { return false }

    currentPromotion.value = result as Promotion

    return true
  }

  async function deletePromotion (id: number) {
    const result = await useApi(`/api/admin/promotions/${id}`).remove()

    if (result === false) { return false }

    return true
  }

  async function updatePromotion (data: Promotion) {
    const result = await useApi(`/api/admin/promotions/${data.id}`, data).put()

    if (result === false) { return false }

    return true
  }

  async function addPromotion (data: Promotion) {
    const result = await useApi('/api/admin/promotions/new', data).post()

    if (result === false) { return false }

    return true
  }

  return { promotions, currentPromotion, getPromotions, getPromotion, deletePromotion, updatePromotion, addPromotion }
})
