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

  const mockCategories = [
    {
      id: 1,
      title: 'Фрукты'
    },
    {
      id: 2,
      title: 'Молочные продукты'
    }
  ]

  return mockCategories
})
