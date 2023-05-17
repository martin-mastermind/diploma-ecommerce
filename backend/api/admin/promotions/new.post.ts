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

  const body = await readBody<Promotion>(event)

  const props = ['title', 'img', 'message', 'total_discount'] as Array<keyof Promotion>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool()
  const promotionSQL = await pool.query('INSERT INTO "Promotions"(title, img, message, total_discount) VALUES ($1, $2, $3, $4) RETURNING id', [body.title, body.img, body.message, body.total_discount])

  if (promotionSQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при создании акции'
    })
  }

  const promotionId = promotionSQL.rows[0].id

  for (const rule of body.rules) {
    await pool.query('INSERT INTO "Promotion_Rules"(promotion_id, category_id, discount) VALUES ($1, $2, $3)', [promotionId, rule.category_id, rule.discount])
  }

  await pool.end()

  return true
})
