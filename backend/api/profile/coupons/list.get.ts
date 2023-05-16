import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const mockCoupons = [
    {
      id: 1,
      title: 'Для новых пользоватей',
      code: 'new-user',
      total_discount: 10,
      rules: [
        {
          category: 'Фрукты',
          discount: 5
        }
      ]
    }
  ]

  return mockCoupons
})
