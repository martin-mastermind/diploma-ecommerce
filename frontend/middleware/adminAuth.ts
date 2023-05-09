import { useUser } from '~/store/admin/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUser()
  const isNeedAuth = Boolean(to.meta.auth)
  const isUserVerified = await userStore.verifyUser()

  if (!isNeedAuth && isUserVerified) {
    return await navigateTo('/admin')
  }

  if (isNeedAuth && !isUserVerified) {
    return await navigateTo('/admin/login')
  }

  const needRole = to.meta.role as string ?? ''
  const currentRole = userStore.user?.type ?? ''

  if (currentRole !== 'full' && needRole !== currentRole) {
    return await navigateTo('/admin')
  }
})
