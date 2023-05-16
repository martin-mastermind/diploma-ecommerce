import { createHash } from 'crypto'

import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const body = await readBody<Client.UserData>(event)
  const props = ['name', 'phone', 'email', 'password'] as Array<'name' | 'phone' | 'email' | 'password'>

  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
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

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')
  const user = mockUsers.find(u => u.id === tokenInfo!.id)

  if (user == null) {
    throw createError({
      statusCode: 403,
      message: 'Пользователя с таким ID не существует'
    })
  }

  user.password = hashedPassword

  // Обновить пользователя в БД

  return {
    id: tokenInfo!.id,
    name: body.name,
    phone: body.phone,
    email: body.email
  }
})
