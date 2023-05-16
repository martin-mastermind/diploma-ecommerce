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

  const mockDeliveries = [
    {
      id: 1,
      city: 'Минск',
      street: 'Пулихова',
      house: 31,
      entrance: 2,
      floor: 7,
      apartment: 45
    }
  ]

  return mockDeliveries
})
