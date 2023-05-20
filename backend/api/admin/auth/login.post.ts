import { createHash } from 'crypto'

import * as pg from 'pg'
import { generateToken, isValidToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

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

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')
  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })

  const userSQL = await pool.query('SELECT id, last_name, first_name, patronymic, type FROM "Administrators" WHERE id = $1 AND password = $2', [body.id, hashedPassword])
  if (userSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Пользователя с такими данными не существует'
    })
  }

  await pool.end()

  const user = userSQL.rows[0]

  setCookie(event, 'token', generateToken(user.id))

  return {
    id: user.id,
    last_name: user.last_name,
    first_name: user.first_name,
    patronymic: user.patronymic,
    type: user.type
  }
})
