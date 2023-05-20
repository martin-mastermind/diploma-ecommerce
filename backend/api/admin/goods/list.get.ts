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
  setCookie(event, 'token', generateToken(getInfoFromToken(token!)!.id))

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  const goodsSql = await pool.query('SELECT id, title, vendor_code FROM "Items" ORDER BY id DESC')

  await pool.end()

  return goodsSql.rows
})
