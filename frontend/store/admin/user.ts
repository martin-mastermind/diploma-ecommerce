import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useUser = defineStore('userStore', () => {
  const user = ref<AdminUser | null>(null)

  async function loginUser (id: number, password: string) {
    const result = await useApi('/api/admin/login', { id, password }).post()

    if (result === false) { return false }

    user.value = result as AdminUser
    return true
  }

  async function logoutUser () {
    const result = await useApi('/api/admin/logout').post()

    if (result === false) { return false }

    user.value = null
    return true
  }

  function isEmptyUser () {
    return user.value === null && useCookie('token').value === undefined
  }

  async function verifyUser () {
    const result = await useApi('/api/admin/verify', { id: user.value?.id }).get()

    if (result === false) { return false }

    user.value = result as AdminUser

    return true
  }

  return { user, loginUser, logoutUser, isEmptyUser, verifyUser }
}, {
  persist: true
})
