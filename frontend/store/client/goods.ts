import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useGoods = defineStore('goodsStore', () => {
  const baseGoods = ref<Client.GoodPreview[]>([])
  const currentGood = ref<Client.Good | null>(null)

  async function getBaseGoods () {
    const result = await useApi('/api/goods/base').get()

    if (result === false) { return false }

    baseGoods.value = result as Client.GoodPreview[]
    return true
  }

  async function getGood (id: number) {
    const result = await useApi(`/api/goods/${id}`).get()

    if (result === false) { return false }

    currentGood.value = result as Client.Good

    return true
  }

  async function addGoodReview (rating: number, message: string) {
    const result = await useApi(`/api/goods/${currentGood.value!.id}`, { rating, message }).post()

    if (result === false) { return false }

    currentGood.value = result as Client.Good

    return true
  }

  return { baseGoods, currentGood, getBaseGoods, getGood, addGoodReview }
})
