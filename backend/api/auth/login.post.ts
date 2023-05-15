import { createHash } from 'crypto'

import { generateToken, isValidToken } from '~~/backend/utils/clientToken'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, password?: string }>(event)

  if (body.email == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле email'
    })
  }

  if (body.password == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле password'
    })
  }

  if (isValidToken(getCookie(event, 'token'))) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь уже авторизован'
    })
  }

  const mockUsers = [
    {
      id: 1,
      name: 'Мартин',
      phone: '+375257075176',
      email: 'martbelmoaw@gmail.com',
      password: 'daf6e3fa8a4a42748c389b4caffb0a7b6bc7de3bb981e20370d7a92acc595b37'
    }
  ]

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')
  const user = mockUsers.find(u => u.email === body.email && u.password === hashedPassword)

  if (user == null) {
    throw createError({
      statusCode: 400,
      message: 'Не найден пользователь с такими данными'
    })
  }

  setCookie(event, 'token', generateToken(user.id))

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email
  }
})
