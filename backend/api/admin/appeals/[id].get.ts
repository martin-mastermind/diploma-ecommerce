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

  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id обращения'
    })
  }

  const mockAppeals = [
    {
      id: 1,
      user: {
        name: 'Мартин',
        phone: '+375 25 707 5176',
        email: 'martbelmoaw@gmail.com'
      },
      status: 'in-work',
      messages: [
        {
          from_admin: false,
          sent_time: '08.05.2023 16:26',
          message: 'Здравствуйте!'
        },
        {
          from_admin: true,
          sent_time: '08.05.2023 16:32',
          message: 'Приветствую!'
        }
      ]
    }
  ]

  const appeal = mockAppeals.find(a => a.id === +id)

  if (appeal == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти обращение'
    })
  }

  return appeal
})
