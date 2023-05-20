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

  const body = await readBody<Client.OrderData>(event)

  let prop: keyof Client.OrderData
  for (prop in body) {
    if (prop === 'coupon') { continue }

    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  if (body.goods.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Невозможно создать пустой заказ'
    })
  }

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })

  let couponId = null

  if (body.coupon !== null) {
    const couponSQL = await pool.query('SELECT id FROM "Coupons" WHERE code = $1', [body.coupon])
    couponId = couponSQL.rows.length === 0 ? null : couponSQL.rows[0].id
  }

  const orderSQL = await pool.query(`
  INSERT INTO "Orders"(user_id, user_delivery_id, coupon_id, pay_type, delivery_date, delivery_from_time, delivery_to_time)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id
  `, [tokenInfo!.id, body.userDelivery, couponId, body.payType, body.deliveryDate, body.deliveryTimeFrom, body.deliveryTimeTo])

  if (orderSQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось добавить заказ'
    })
  }

  const orderId = orderSQL.rows[0].id

  for (const good of body.goods) {
    await pool.query('INSERT INTO "Order_Items"(order_id, item_id, amount) VALUES ($1, $2, $3)', [orderId, good.id, good.amount])
  }

  await pool.end()

  return true
})
