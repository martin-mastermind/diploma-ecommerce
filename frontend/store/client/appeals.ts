import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useAppeals = defineStore('appealsStore', () => {
  const appeals = ref<Client.AppealPreview[]>([])
  const currentAppeal = ref<Client.Appeal | null>(null)

  async function getAppeals () {
    const result = await useApi('/api/profile/appeals/list').get()

    if (result === false) {
      appeals.value = []
      return false
    }

    appeals.value = result as Client.AppealPreview[]
    return true
  }

  async function getAppeal (id?: number) {
    const result = await useApi(`/api/profile/appeals/${id ?? 0}`).get()

    if (result === false) {
      currentAppeal.value = null
      return false
    }

    currentAppeal.value = result as Client.Appeal
    return true
  }

  async function closeAppeal (id: number) {
    const result = await useApi(`/api/profile/appeals/${id}`).remove()

    return result
  }

  async function sendAppealMessage (text: string) {
    if (currentAppeal.value == null) { return false }

    const result = await useApi(`/api/profile/appeals/${currentAppeal.value.id}/message`, { text }).post()

    if (result === false) {
      currentAppeal.value = null
      return false
    }

    currentAppeal.value = result as Client.Appeal
    return true
  }

  return { appeals, currentAppeal, getAppeals, getAppeal, closeAppeal, sendAppealMessage }
})
