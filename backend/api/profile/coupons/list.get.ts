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

  const pool = new Pool()

  const couponsSQL = await pool.query('SELECT id, title, code, total_discount FROM "Coupons" WHERE use_amount > 0')

  const coupons = []
  for (const coupon of couponsSQL.rows) {
    const rulesSQL = await pool.query(`
      SELECT c.title category, pr.discount 
      FROM "Coupon_Rules" cr 
      JOIN "Categories" c ON cr.category_id = c.id 
      WHERE coupon_id = $1
    `, [coupon.id])

    coupons.push({
      ...coupon,
      rules: rulesSQL.rows
    })
  }

  await pool.end()

  return coupons
})
