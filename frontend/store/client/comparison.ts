import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useComparison = defineStore('comparisonStore', () => {
  const comparisonIds = ref<number[]>([])
  const comparison = ref<Client.Comparison[]>([])

  async function getComparison () {
    if (comparisonIds.value.length === 0) {
      comparison.value = []
      return false
    }

    const result = await useApi('/api/comparison/list', { ids: JSON.stringify(comparisonIds.value) }).get()

    if (result === false) {
      comparison.value = []
      return false
    }

    comparison.value = result as Client.Comparison[]
    return true
  }

  function toggleComparison (id: number) {
    const idIndex = comparisonIds.value.findIndex(c => c === id)

    if (idIndex === -1) {
      comparisonIds.value.push(id)
      return
    }

    comparisonIds.value.splice(idIndex, 1)
  }

  function removeComparison (id: number) {
    const idIndex = comparisonIds.value.findIndex(c => c === id)

    comparisonIds.value.splice(idIndex, 1)
    comparison.value.splice(idIndex, 1)
  }

  return { comparisonIds, comparison, getComparison, toggleComparison, removeComparison }
}, {
  persist: true
})
