import { isValidToken } from '~~/backend/utils/adminToken'

export default defineEventHandler((event) => {
  if (!isValidToken(getCookie(event, 'token'))) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }

  deleteCookie(event, 'token')

  return {
    success: true
  }
})
