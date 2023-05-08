import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCategories = defineStore('categoriesStore', () => {
  const categories = ref<CategoryPreview[]>([])
  const currentCategory = ref<Category | null>(null)

  async function getCategories () {
    const result = await useApi('/api/admin/categories/list').get()

    if (result === false) { return false }

    categories.value = result as CategoryPreview[]
    return true
  }

  async function getCategory (id: number) {
    const result = await useApi(`/api/admin/categories/${id}`).get()

    if (result === false) { return false }

    currentCategory.value = result as Category

    return true
  }

  async function deleteCategory (id: number) {
    const result = await useApi(`/api/admin/categories/${id}`).remove()

    if (result === false) { return false }

    return true
  }

  async function updateCategory (data: Category) {
    const result = await useApi(`/api/admin/categories/${data.id}`, data).put()

    if (result === false) { return false }

    return true
  }

  async function addCategory (data: Category) {
    const result = await useApi('/api/admin/categories/new', data).post()

    if (result === false) { return false }

    return true
  }

  return { categories, currentCategory, getCategories, getCategory, deleteCategory, updateCategory, addCategory }
})
