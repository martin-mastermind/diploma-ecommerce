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

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  const appealsSQL = await pool.query(`
    SELECT a.id, CONCAT(adm.last_name, ' ', adm.first_name, ' ', adm.patronymic) admin_name, a.status 
    FROM "Appeals" a
    LEFT JOIN "Administrators" adm ON a.admin_id = adm.id
    WHERE user_id = $1
  `, [tokenInfo!.id])
  await pool.end()

  const appeals = []
  for (const appeal of appealsSQL.rows) {
    appeals.push({
      id: appeal.id,
      admin: {
        name: appeal.admin_name
      },
      status: appeal.status
    })
  }

  return appeals
})
