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

  const body = await readBody<Coupon>(event)

  const props = ['title', 'code', 'use_amount', 'total_discount'] as Array<keyof Coupon>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  const couponSQL = await pool.query('INSERT INTO "Coupons"(title, code, use_amount, total_discount) VALUES ($1, $2, $3, $4) RETURNING id', [body.title, body.code, body.use_amount, body.total_discount])

  if (couponSQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при создании купона'
    })
  }

  const couponId = couponSQL.rows[0].id

  for (const rule of body.rules) {
    await pool.query('INSERT INTO "Coupon_Rules"(coupon_id, category_id, discount) VALUES ($1, $2, $3)', [couponId, rule.category_id, rule.discount])
  }

  await pool.end()

  return true
})
