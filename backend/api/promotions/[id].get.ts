import * as pg from 'pg'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id акции'
    })
  }

  const pool = new Pool()

  const promotionSQL = await pool.query('SELECT id, img, title, message, img, total_discount FROM "Promotions" WHERE id = $1', [+id])
  if (promotionSQL.rows.length === 0) {
    await pool.end()
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти указанную акцию'
    })
  }

  const rulesSQL = await pool.query(`
    SELECT c.title category, pr.discount 
    FROM "Promotion_Rules" pr 
    JOIN "Categories" c ON pr.category_id = c.id 
    WHERE promotion_id = $1
  `, [+id])

  await pool.end()

  const promotion = {
    ...promotionSQL.rows[0],
    rules: rulesSQL.rows
  }

  return promotion
})
