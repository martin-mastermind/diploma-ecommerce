import { useUser } from '~/store/admin/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUser()

  if (!userStore.isEmptyUser() && !await userStore.verifyUser()) {
    return await navigateTo('/admin/login')
  }

  if (to.name === 'admin-login' && userStore.user != null) {
    return await navigateTo('/admin')
  }

  if (to.name !== 'admin-login' && userStore.user == null) {
    return await navigateTo('/admin/login')
  }
})
