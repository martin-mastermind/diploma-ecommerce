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
  const ordersSQL = await pool.query('SELECT id, delivery_date, delivery_from_time, delivery_to_time, status FROM "Orders" WHERE user_id = $1 ORDER BY id DESC', [tokenInfo!.id])

  const orders = []
  for (const order of ordersSQL.rows) {
    const totalSQL = await pool.query(`
      SELECT SUM(i.price * oi.amount) total
      FROM "Order_Items" oi
      JOIN "Items" i ON oi.item_id = i.id
      WHERE oi.order_id = $1
      GROUP BY oi.order_id
    `, [order.id])

    orders.push({
      ...order,
      delivery_date: new Date(order.delivery_date).toLocaleDateString(),
      delivery_from_time: order.delivery_from_time.slice(0, 5),
      delivery_to_time: order.delivery_to_time.slice(0, 5),
      total: totalSQL.rows[0].total ?? 0
    })
  }

  await pool.end()

  return orders
})
