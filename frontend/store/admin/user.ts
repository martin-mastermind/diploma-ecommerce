import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useUser = defineStore('userStore', () => {
  const user = ref<AdminUser | null>(null)

  async function loginUser (id: number, password: string) {
    const result = await useApi(AdminUserAPI.LOGIN, { id, password }).post()

    if (result === false) { return false }

    user.value = result as AdminUser
    return true
  }

  async function logoutUser () {
    const result = await useApi(AdminUserAPI.LOGOUT).post()

    if (result === false) { return false }

    user.value = null
    return true
  }

  return { user, loginUser, logoutUser }
}, {
  persist: true
})
