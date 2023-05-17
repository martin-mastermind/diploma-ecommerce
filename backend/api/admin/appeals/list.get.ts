import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
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
  const appealsSQL = await pool.query(`
    SELECT a.id, u.name user_name, a.status 
    FROM "Appeals" a
    JOIN "Users" u ON a.user_id = u.id
    WHERE admin_id = $1 OR status = 'new'
  `, [tokenInfo!.id])

  await pool.end()

  const appeals = []
  for (const appeal of appealsSQL.rows) {
    appeals.push({
      id: appeal.id,
      user: {
        name: appeal.user_name
      }
    })
  }

  return appeals
})
