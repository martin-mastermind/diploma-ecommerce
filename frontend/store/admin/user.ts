import { defineStore } from 'pinia'

import { notify } from '@kyvg/vue3-notification'

export const useUser = defineStore('userStore', () => {
  const user = ref<AdminUser | null>(null)

  async function loginUser (id: number, password: string) {
    const { data, error } = await useFetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { id, password }
    })

    if (error.value != null) {
      notify({
        type: 'error',
        title: 'Авторизация',
        text: `Произошла ошибка, повторите попытку <br><br> ${error.value?.data.message as string}`
      })
      return false
    }

    user.value = data.value
    return true
  }

  return { user, loginUser }
}, {
  persist: true
})
