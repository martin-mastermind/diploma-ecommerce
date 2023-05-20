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

  const body = await readBody<Good>(event)

  const props = ['title', 'vendor_code', 'img', 'origin_country', 'description', 'characteristic', 'weight', 'price', 'amount'] as Array<keyof Good>
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
  await pool.query(`
    INSERT INTO "Items"(title, category_id, vendor_code, img, origin_country, description, characteristic, weight, price, amount)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `, [body.title, body.category_id, body.vendor_code, body.img, body.origin_country, body.description, body.characteristic, body.weight, body.price, body.amount])

  await pool.end()

  return true
})
