import { useUser } from '~/store/admin/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useUser()

  if (to.name === 'admin-login' && user != null) {
    return await navigateTo('/admin')
  }

  if (to.name !== 'admin-login' && user == null) {
    return await navigateTo('/admin/login')
  }
})
