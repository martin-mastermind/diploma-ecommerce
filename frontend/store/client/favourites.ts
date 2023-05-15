import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useFavourites = defineStore('favouritesStore', () => {
  const favourites = ref<Client.GoodPreview[]>([])

  async function getFavourites () {
    const result = await useApi('/api/favourites/list').get()

    if (result === false) {
      favourites.value = []
      return false
    }

    favourites.value = result as Client.GoodPreview[]
    return true
  }

  async function toggleFavourite (id: number) {
    const result = await useApi(`/api/favourites/${id}`).post()

    if (result === false) {
      return false
    }

    favourites.value = result as Client.GoodPreview[]
    return true
  }

  return { favourites, getFavourites, toggleFavourite }
})
