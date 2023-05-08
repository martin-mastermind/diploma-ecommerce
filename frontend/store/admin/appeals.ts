import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useAppeals = defineStore('appealsStore', () => {
  const appeals = ref<AppealPreview[]>([])
  const currentAppeal = ref<Appeal | null>(null)

  async function getAppeals () {
    const result = await useApi('/api/admin/appeals/list').get()

    if (result === false) { return false }

    appeals.value = result as AppealPreview[]
    return true
  }

  async function getAppeal (id: number) {
    const result = await useApi(`/api/admin/appeals/${id}`).get()

    if (result === false) { return false }

    currentAppeal.value = result as Appeal

    return true
  }

  async function closeAppeal () {
    if (currentAppeal.value == null) { return false }

    const result = await useApi(`/api/admin/appeals/${currentAppeal.value.id}`).put()

    if (result === false) { return false }

    return true
  }

  async function sendMessage (message: string) {
    if (currentAppeal.value == null || message === '') { return false }

    const result = await useApi('/api/admin/appeals/answer', { id: currentAppeal.value.id, message }).post()

    if (result === false) { return false }

    return true
  }

  return { appeals, currentAppeal, getAppeals, getAppeal, closeAppeal, sendMessage }
})
