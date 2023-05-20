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
  const deliveriesSQL = await pool.query('SELECT * FROM "User_Deliveries" WHERE user_id = $1', [tokenInfo!.id])
  await pool.end()

  return deliveriesSQL.rows
})
