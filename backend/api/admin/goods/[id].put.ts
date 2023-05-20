import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id товара'
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

  const body = await readBody<Good>(event)

  const props = ['id', 'title', 'vendor_code', 'img', 'origin_country', 'description', 'characteristic', 'weight', 'price', 'amount'] as Array<keyof Good>
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
    UPDATE "Items" 
    SET title = $2, category_id = $3, vendor_code = $4, img = $5, origin_country = $6, description = $7, characteristic = $8, weight = $9, price = $10, amount = $11
    WHERE id = $1
  `, [+id, body.title, body.category_id, body.vendor_code, body.img, body.origin_country, body.description, body.characteristic, body.weight, body.price, body.amount])

  await pool.end()

  return true
})
