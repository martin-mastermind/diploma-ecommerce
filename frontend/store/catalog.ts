import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCatalog = defineStore('catalogStore', () => {
  const categories = ref<Client.Category[]>([])

  async function getCategories () {
    const result = await useApi('/api/catalog/categories').get()

    if (result === false) { return false }

    categories.value = result as Client.Category[]
    return true
  }

  return { categories, getCategories }
})
