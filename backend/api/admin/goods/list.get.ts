import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  setCookie(event, 'token', generateToken(getInfoFromToken(token!)!.id))

  const mockGoods = [
    {
      id: 1,
      vendor_code: 'A-1000',
      title: 'Банан'
    },
    {
      id: 2,
      vendor_code: 'G-1001',
      title: 'Яблоко'
    }
  ]

  return mockGoods
})
