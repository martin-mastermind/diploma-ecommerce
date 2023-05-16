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

  const mockOrders = [
    {
      id: 1,
      total: 8.5,
      delivery_date: '14.05.2023',
      delivery_from_time: '14:00',
      delivery_to_time: '18:00',
      status: 'new'
    }
  ]

  return mockOrders
})
