import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useUser = defineStore('userStore', () => {
  const user = ref<Client.User | null>(null)

  async function loginUser (email: string, password: string) {
    const result = await useApi('/api/auth/login', { email, password }).post()

    if (result === false) { return false }

    user.value = result as Client.User
    return true
  }

  async function registerUser (name: string, email: string, phone: string, password: string) {
    const result = await useApi('/api/auth/register', { name, email, phone, password }).post()

    if (result === false) { return false }

    user.value = result as Client.User
    return true
  }

  async function logoutUser () {
    const result = await useApi('/api/auth/logout').post()

    if (result === false) { return false }

    user.value = null
    return true
  }

  function isEmptyUser () {
    return user.value === null && useCookie('token').value === undefined
  }

  async function verifyUser () {
    const result = await useApi('/api/auth/verify', { id: user.value?.id }).get()

    if (result === false) { return false }

    user.value = result as Client.User

    return true
  }

  return { user, loginUser, registerUser, logoutUser, isEmptyUser, verifyUser }
}, {
  persist: true
})
