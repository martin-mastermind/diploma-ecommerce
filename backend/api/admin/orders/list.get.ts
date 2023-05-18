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

  const pool = new Pool()
  const ordersSQL = await pool.query(`
    SELECT o.id, u.name user_name
    FROM "Orders" o
    JOIN "Users" u ON o.user_id = u.id
    ORDER BY o.id DESC
  `)

  await pool.end()

  const orders = []
  for (const order of ordersSQL.rows) {
    orders.push({
      id: order.id,
      user: {
        name: order.user_name
      }
    })
  }

  return orders
})
