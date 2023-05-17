import { createHash } from 'crypto'

import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

const { Pool } = pg.default

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
  let prop: keyof Client.UserData

  for (prop in body) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const hashedPassword = createHash('sha256').update(body.password).digest('hex')

  const pool = new Pool()

  const hasChangedPassword = body.password.length >= 8

  const query = `UPDATE "Users" SET name = $2, email = $3, phone = $4${hasChangedPassword ? ', password = $5 ' : ' '}WHERE id = $1 RETURNING *`
  const data = [tokenInfo!.id, body.name, body.email, body.phone]
  if (hasChangedPassword) { data.push(hashedPassword) }

  const userSQL = await pool.query(query, data)
  if (userSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Ошибка при обновлении профиля...'
    })
  }

  await pool.end()

  const user = userSQL.rows[0]

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email
  }
})
