import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCoupons = defineStore('couponsStore', () => {
  const coupons = ref<Client.Coupon[]>([])

  async function getCoupons () {
    const result = await useApi('/api/profile/coupons/list').get()

    if (result === false) {
      coupons.value = []
      return false
    }

    coupons.value = result as Client.Coupon[]
    return true
  }

  return { coupons, getCoupons }
})
