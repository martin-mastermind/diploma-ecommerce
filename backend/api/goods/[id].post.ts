import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'
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
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const body = await readBody<{ rating?: string, message?: string }>(event)

  if (body.rating == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле rating'
    })
  }

  if (body.message == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле message'
    })
  }

  const pool = new Pool()

  await pool.query('INSERT INTO "Item_Reviews"(user_id, item_id, score, commentary) VALUES($1, $2, $3, $4)', [tokenInfo!.id, +id, body.rating, body.message])

  const goodSQL = await pool.query(`
    SELECT i.*, AVG(score) total, COUNT(score) total_reviews
    FROM "Items" i
    JOIN "Item_Reviews" ir ON ir.item_id = i.id
    WHERE i.id = $1
    GROUP BY i.id
  `, [+id])

  if (goodSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти указанный товар'
    })
  }

  const reviewsSQL = await pool.query(`
    SELECT u.name, commentary as message, score as rating
    FROM "Item_Reviews" ir
    JOIN "Users" u ON ir.user_id = u.id
    WHERE item_id = $1
  `, [+id])

  await pool.end()

  const good = goodSQL.rows[0]
  good.rating = {
    total: good.total,
    total_reviews: good.total_reviews,
    reviews: reviewsSQL.rows
  }

  return good
})
