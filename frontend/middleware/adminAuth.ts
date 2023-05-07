import { useUser } from '~/store/admin/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUser()

  if (!userStore.isEmptyUser() && !await userStore.verifyUser()) {
    return await navigateTo('/admin/login')
  }

  const isNeedAuth = Boolean(to.meta.auth)

  if (isNeedAuth && userStore.user === null) {
    return await navigateTo('/admin/login')
  }

  if (!isNeedAuth && userStore.user !== null) {
    return await navigateTo('/admin')
  }
})
