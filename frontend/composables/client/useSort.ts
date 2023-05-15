import { useEvent, useListen } from '~/composables/utils/useEventBus'

export function useSort () {
  const isSortOpen = ref(false)
  const sortOptions = ref<Client.CatalogSort[]>([
    {
      type: 'default',
      title: 'По умолчанию'
    },
    {
      type: 'price-down',
      title: 'По убыванию цены'
    },
    {
      type: 'price-up',
      title: 'По возрастанию цены'
    },
    {
      type: 'rating',
      title: 'По рейтингу'
    }
  ])
  const selectedSort = ref<Client.CatalogSortType>('default')

  useListen('catalog:dropdown', (event) => {
    if (event === 'filter') {
      isSortOpen.value = false
      return
    }
    if (event === 'sort' && isSortOpen.value) {
      isSortOpen.value = false
      return
    }
    isSortOpen.value = true
  })

  function toggleSort () {
    useEvent('catalog:dropdown', 'sort')
  }

  function changeSort (type: Client.CatalogSortType) {
    selectedSort.value = type
    useEvent('catalog:dropdown', 'sort')
    useEvent('catalog:update', { sort: selectedSort.value })
  }

  return { isSortOpen, sortOptions, selectedSort, toggleSort, changeSort }
}
