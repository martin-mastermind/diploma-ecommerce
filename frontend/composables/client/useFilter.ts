import { useEvent, useListen } from '~/composables/utils/useEventBus'

export function useFilter () {
  const isFilterOpen = ref(false)
  const filterValue = ref<{ from: string | null, to: string | null }>({
    from: null,
    to: null
  })

  useListen('catalog:dropdown', (event) => {
    if (event === 'sort') {
      isFilterOpen.value = false
      return
    }
    if (event === 'filter' && isFilterOpen.value) {
      isFilterOpen.value = false
      return
    }
    isFilterOpen.value = true
  })

  function toggleFilter () {
    useEvent('catalog:dropdown', 'filter')
  }

  function applyFilter () {
    if (filterValue.value.from != null && filterValue.value.to != null) {
      const fromValue = +filterValue.value.from
      const toValue = +filterValue.value.to

      if (fromValue < 0) { filterValue.value.from = '0.00' }
      if (fromValue >= 100) { filterValue.value.from = '99.99' }

      if (toValue < 0) { filterValue.value.to = '0.00' }
      if (toValue >= 100) { filterValue.value.to = '99.99' }

      if (fromValue > toValue) { filterValue.value.to = filterValue.value.from }
    }

    useEvent('catalog:dropdown', 'filter')

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    useEvent('catalog:update', { filter: { from: +(filterValue.value.from || 0), to: +(filterValue.value.to || 99.99) } })
  }

  return { isFilterOpen, filterValue, toggleFilter, applyFilter }
}
