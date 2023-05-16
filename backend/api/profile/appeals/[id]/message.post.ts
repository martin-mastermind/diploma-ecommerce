import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler(async (event) => {
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

  const body = await readBody<{ text: string }>(event)
  if (body.text == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле text'
    })
  }

  // Если id === 0 => добавить новое обращение и в него сообщение
  // Иначе => добавить сообщение в обращение

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
      },
      {
        from_admin: false,
        sent_time: '16.05.2023 17:21',
        message: body.text
      }
    ]
  }

  return mockAppeal
})
