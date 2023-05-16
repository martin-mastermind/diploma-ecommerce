import { createHash } from 'crypto'

import { clientGenerateToken, clientIsValidToken } from '~~/backend/utils/clientToken'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string, phone?: string, email?: string, password?: string }>(event)
  const props = ['name', 'phone', 'email', 'password'] as Array<'name' | 'phone' | 'email' | 'password'>

  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  if (clientIsValidToken(getCookie(event, 'token'))) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь уже авторизован'
    })
  }

  const mockUsers = [
    {
      id: 1,
      name: 'Мартин',
      email: 'martbelmoaw@gmail.com',
      phone: '+375257075176',
      password: 'daf6e3fa8a4a42748c389b4caffb0a7b6bc7de3bb981e20370d7a92acc595b37'
    }
  ]

  const hashedPassword = createHash('sha256').update(body.password!).digest('hex')
  const user = mockUsers.find(u => u.email === body.email || u.phone === body.phone)

  if (user != null) {
    throw createError({
      statusCode: 400,
      message: 'Пользователь с такими данными уже существует'
    })
  }

  // Добавить пользователя в БД

  const newUser = {
    id: 2,
    name: body.name,
    phone: body.phone,
    email: body.email,
    password: hashedPassword
  }

  setCookie(event, 'token', clientGenerateToken(newUser.id))

  return {
    id: newUser.id,
    name: newUser.name,
    phone: newUser.phone,
    email: newUser.email
  }
})
