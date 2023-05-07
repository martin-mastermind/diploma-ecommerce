import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCategories = defineStore('categoriesStore', () => {
  const categories = ref<CategoryPreview[]>([])

  async function getCategories () {
    const result = await useApi('/api/admin/categories/list').get()

    if (result === false) { return false }

    categories.value = result as CategoryPreview[]
    return true
  }

  return { categories, getCategories }
})
