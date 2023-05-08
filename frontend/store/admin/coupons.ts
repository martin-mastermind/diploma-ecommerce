import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCoupons = defineStore('couponsStore', () => {
  const coupons = ref<CouponPreview[]>([])
  const currentCoupon = ref<Coupon | null>(null)

  async function getCoupons () {
    const result = await useApi('/api/admin/coupons/list').get()

    if (result === false) { return false }

    coupons.value = result as CouponPreview[]
    return true
  }

  async function getCoupon (id: number) {
    const result = await useApi(`/api/admin/coupons/${id}`).get()

    if (result === false) { return false }

    currentCoupon.value = result as Coupon

    return true
  }

  async function deleteCoupon (id: number) {
    const result = await useApi(`/api/admin/coupons/${id}`).remove()

    if (result === false) { return false }

    return true
  }

  async function updateCoupon (data: Coupon) {
    const result = await useApi(`/api/admin/coupons/${data.id}`, data).put()

    if (result === false) { return false }

    return true
  }

  async function addCoupon (data: Coupon) {
    const result = await useApi('/api/admin/coupons/new', data).post()

    if (result === false) { return false }

    return true
  }

  return { coupons, currentCoupon, getCoupons, getCoupon, deleteCoupon, updateCoupon, addCoupon }
})
