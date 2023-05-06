import { createHash } from 'crypto'

import { generateToken, isValidToken } from '~~/backend/utils/adminToken'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ id?: number, password?: string }>(event)

  if (body.id == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле id'
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
      last_name: 'Mock',
      first_name: 'User',
      patronymic: null,
      type: 'full',
      password: 'daf6e3fa8a4a42748c389b4caffb0a7b6bc7de3bb981e20370d7a92acc595b37'
    }
  ]

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')
  const user = mockUsers.find(u => u.id === body.id && u.password === hashedPassword)

  if (user == null) {
    throw createError({
      statusCode: 400,
      message: 'Не найден пользователь с такими данными'
    })
  }

  setCookie(event, 'token', generateToken(user.id))

  return {
    id: user.id,
    last_name: user.last_name,
    first_name: user.first_name,
    patronymic: user.patronymic,
    type: user.type
  }
})
