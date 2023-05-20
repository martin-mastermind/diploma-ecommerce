import { createHash } from 'crypto'

import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken } from '~~/backend/utils/clientToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string, password: string }>(event)
  const props = ['email', 'password'] as Array<'email' | 'password'>

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

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')
  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })

  const userSQL = await pool.query('SELECT id, name, email, phone FROM "Users" WHERE email = $1 AND password = $2', [body.email, hashedPassword])
  if (userSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Пользователя с такими данными не существует'
    })
  }

  await pool.end()

  const user = userSQL.rows[0]

  setCookie(event, 'token', clientGenerateToken(user.id))

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email
  }
})
