import * as pg from 'pg'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id товара'
    })
  }

  const pool = new Pool()

  const goodSQL = await pool.query(`
    SELECT i.*, COALESCE(AVG(score),0) total, COALESCE(COUNT(score),0) total_reviews 
    FROM "Items" i
    LEFT JOIN "Item_Reviews" ir ON ir.item_id = i.id
    WHERE i.id = $1 AND i.amount > 0
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
