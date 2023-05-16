import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id обращения'
    })
  }

  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const mockAppeal = {
    id: 1,
    admin: {
      name: 'Скала Петр Иванович'
    },
    status: 'in-work',
    messages: [
      {
        from_admin: false,
        sent_time: '14.05.2023 15:41',
        message: 'Здавствуйте! У меня проблема'
      },
      {
        from_admin: true,
        sent_time: '14.05.2023 15:42',
        message: 'Здавствуйте! Что случилось?'
      },
      {
        from_admin: false,
        sent_time: '14.05.2023 15:41',
        message: 'Здавствуйте! У меня проблема'
      },
      {
        from_admin: true,
        sent_time: '14.05.2023 15:42',
        message: 'Здавствуйте! Что случилось?'
      },
      {
        from_admin: false,
        sent_time: '14.05.2023 15:41',
        message: 'Здавствуйте! У меня проблема'
      },
      {
        from_admin: true,
        sent_time: '14.05.2023 15:42',
        message: 'Здавствуйте! Что случилось?'
      },
      {
        from_admin: false,
        sent_time: '14.05.2023 15:41',
        message: 'Здавствуйте! У меня проблема'
      },
      {
        from_admin: true,
        sent_time: '14.05.2023 15:42',
        message: 'Здавствуйте! Что случилось?'
      }
    ]
  }

  return mockAppeal
})
