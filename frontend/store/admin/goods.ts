import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useGoods = defineStore('goodsStore', () => {
  const goods = ref<GoodPreview[]>([])
  const currentGood = ref<Good | null>(null)

  async function getGoods () {
    const result = await useApi('/api/admin/goods/list').get()

    if (result === false) { return false }

    goods.value = result as GoodPreview[]
    return true
  }

  async function getGood (id: number) {
    const result = await useApi(`/api/admin/goods/${id}`).get()

    if (result === false) { return false }

    currentGood.value = result as Good

    return true
  }

  async function deleteGood (id: number) {
    const result = await useApi(`/api/admin/goods/${id}`).remove()

    if (result === false) { return false }

    return true
  }

  async function updateGood (data: Good) {
    const result = await useApi(`/api/admin/goods/${data.id}`, data).put()

    if (result === false) { return false }

    return true
  }

  async function addGood (data: Good) {
    const result = await useApi('/api/admin/goods/new', data).post()

    if (result === false) { return false }

    return true
  }

  return { goods, currentGood, getGoods, getGood, deleteGood, updateGood, addGood }
})
