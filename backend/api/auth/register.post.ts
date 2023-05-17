import { createHash } from 'crypto'

import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken } from '~~/backend/utils/clientToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string, phone: string, email: string, password: string }>(event)
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

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')
  const pool = new Pool()

  const userSQL = await pool.query('SELECT id FROM "Users" WHERE email = $1 OR phone = $2', [body.email, body.phone])
  if (userSQL.rows.length > 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Пользователь с такими данными уже существует'
    })
  }

  const newUserSQL = await pool.query('INSERT INTO "Users"(name, email, phone, password) VALUES($1, $2, $3, $4) RETURNING *', [body.name, body.email, body.phone, hashedPassword])
  if (newUserSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 500,
      message: 'Не удалось зарегистрировать пользователя'
    })
  }

  await pool.end()

  const newUser = newUserSQL.rows[0]

  setCookie(event, 'token', clientGenerateToken(newUser.id))

  return {
    id: newUser.id,
    name: newUser.name,
    phone: newUser.phone,
    email: newUser.email
  }
})
