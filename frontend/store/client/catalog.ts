import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'
import { useListen } from '~/composables/utils/useEventBus'

export const useCatalog = defineStore('catalogStore', () => {
  const categories = ref<Client.Category[]>([])
  const currentCatalog = ref<Client.Catalog | null>(null)
  const formattedCatalog = ref<Client.Catalog | null>(null)

  const selectedSort = ref<Client.CatalogSortType>('default')
  const selectedFilter = ref<Client.CatalogFilter>({
    from: 0,
    to: 99.99
  })

  async function getCategories () {
    const result = await useApi('/api/catalog/categories').get()

    if (result === false) { return false }

    categories.value = result as Client.Category[]
    return true
  }

  async function getCatalogById (id: number) {
    const result = await useApi(`/api/catalog/${id}`).get()

    if (result === false) { return false }

    currentCatalog.value = result as Client.Catalog
    updateCatalog()
    return true
  }

  async function getCatalogBySlug (slug: string) {
    const result = await useApi('/api/catalog/search', { slug }).get()

    if (result === false) { return false }

    currentCatalog.value = result as Client.Catalog
    updateCatalog()
    return true
  }

  function sortCatalog (a: Client.GoodPreview, b: Client.GoodPreview) {
    if (selectedSort.value === 'default') { return 0 }
    if (selectedSort.value === 'price-down') { return b.price! - a.price! }
    if (selectedSort.value === 'price-up') { return a.price! - b.price! }
    return b.rating!.total - a.rating!.total
  }

  function updateCatalog () {
    formattedCatalog.value = currentCatalog.value == null
      ? null
      : {
          title: currentCatalog.value.title,
          goods: currentCatalog.value.goods
            .filter(good => good.price! >= selectedFilter.value.from && good.price! <= selectedFilter.value.to)
            .sort(sortCatalog)
        }
  }

  useListen('catalog:update', (event) => {
    if (event.sort !== undefined) {
      selectedSort.value = event.sort
    }

    if (event.filter !== undefined) {
      selectedFilter.value = event.filter
    }

    updateCatalog()
  })

  return { categories, formattedCatalog, getCategories, getCatalogById, getCatalogBySlug }
})
