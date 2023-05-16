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

  const mockAppeals = [
    {
      id: 1,
      admin: {
        name: 'Скала Петр Иванович'
      },
      status: 'in-work' as 'new' | 'in-work' | 'closed'
    }
  ]

  return mockAppeals
})
