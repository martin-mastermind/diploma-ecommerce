import { clientIsValidToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  if (!clientIsValidToken(getCookie(event, 'token'))) {
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
