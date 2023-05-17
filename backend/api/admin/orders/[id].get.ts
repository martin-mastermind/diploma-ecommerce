import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id заказа'
    })
  }

  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  setCookie(event, 'token', generateToken(getInfoFromToken(token!)!.id))

  const pool = new Pool()
  const orderSQL = await pool.query(`
    SELECT o.*, u.name, u.phone, u.email, ud.city, ud.street, ud.house, ud.entrance, ud.floor, ud.apartment, ud.commentary
    FROM "Orders" o
    JOIN "Users" u ON o.user_id = u.id
    JOIN "User_Deliveries" ud ON o.user_delivery_id = ud.id
    WHERE o.id = $1
  `, [+id])

  if (orderSQL.row.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Данного заказа не существует'
    })
  }

  const order = orderSQL.rows[0]

  const couponSQL = await pool.query('SELECT id, code, total_discount FROM "Coupons" WHERE id = $1', [order.coupon_id])
  if (couponSQL.row.length !== 0) {
    const coupon = couponSQL.rows[0]
    const rulesSQL = await pool.query('SELECT * FROM "Coupon_Rules" WHERE coupon_id = $1', [coupon.id])

    order.coupon = {
      ...coupon,
      rules: rulesSQL.rows
    }
  }

  const goodsSQL = await pool.query(`
    SELECT i.title, c.title category, i.vendor_code, i.price, oi.amount
    FROM "Order_Items" oi
    JOIN "Items" i ON oi.item_id = i.id
    JOIN "Categories" c ON i.category_id = c.id
    WHERE oi.order_id = $1
  `, [order.id])

  await pool.end()

  return {
    id: order.id,
    user: {
      name: order.name,
      phone: order.phone,
      email: order.email
    },
    user_delivery: {
      city: order.city,
      street: order.street,
      house: order.house,
      entrance: order.entrance,
      floor: order.floor,
      apartment: order.apartment,
      commentary: order.commentary
    },
    coupon: order.coupon ?? null,
    pay_type: order.pay_type,
    delivery_date: order.delivery_date,
    delivery_from_time: order.delivery_from_time,
    delivery_to_time: order.delivery_to_time,
    status: order.status,
    goods: goodsSQL.rows
  }
})
