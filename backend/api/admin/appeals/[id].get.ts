import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id обращения'
    })
  }

  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }

  const tokenInfo = getInfoFromToken(token!)
  setCookie(event, 'token', generateToken(tokenInfo!.id))

  const pool = new Pool()
  const appealSQL = await pool.query(`
    SELECT a.id, u.name user_name, u.phone user_phone, u.email user_email, a.status 
    FROM "Appeals" a
    JOIN "Users" u ON a.user_id = u.id
    WHERE (admin_id = $1 OR status = 'new') AND a.id = $2
  `, [tokenInfo!.id, +id])

  if (appealSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Обращение недоступно'
    })
  }

  const appeal = appealSQL.rows[0]

  const messagesSQL = await pool.query('SELECT from_admin, sent_time, message FROM "Appeal_Messages" WHERE appeal_id = $1', [appeal.id])

  await pool.end()

  return {
    ...appeal,
    user: {
      name: appeal.user_name,
      phone: appeal.user_phone,
      email: appeal.user_email
    },
    messages: messagesSQL.rows
  }
})
