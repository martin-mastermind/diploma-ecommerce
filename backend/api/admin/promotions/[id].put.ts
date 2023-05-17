import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id акции'
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

  const body = await readBody<Promotion>(event)

  const props = ['id', 'title', 'img', 'message', 'total_discount'] as Array<keyof Promotion>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool()
  await pool.query('UPDATE "Promotions" SET title = $2, img = $3, message = $4, total_discount = $5 WHERE id = $1', [+id, body.title, body.img, body.message, body.total_discount])

  await pool.query('DELETE FROM "Promotion_Rules" WHERE id NOT IN ($1)', [body.rules.map(r => r.id).join(', ')])

  for (const rule of body.rules) {
    if (rule.id > 0) {
      await pool.query('UPDATE "Promotion_Rules" SET category_id = $2, discount = $3 WHERE id = $1', [rule.id, rule.category_id, rule.discount])
      continue
    }

    await pool.query('INSERT INTO "Promotion_Rules"(promotion_id, category_id, discount) VALUES ($1, $2, $3)', [+id, rule.category_id, rule.discount])
  }

  return true
})
