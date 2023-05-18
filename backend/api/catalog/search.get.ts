import * as pg from 'pg'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const body = getQuery(event)

  if (body.slug == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле slug'
    })
  }

  const slug = body.slug as string

  const pool = new Pool()

  const goodsSQL = await pool.query(`
    SELECT i.id, title, img, price, COALESCE(ROUND(AVG(score), 2),0) total, COALESCE(COUNT(score),0) total_reviews 
    FROM "Items" i
    LEFT JOIN "Item_Reviews" ir ON ir.item_id = i.id
    WHERE position($1 in title) > 0 AND i.amount > 0
    GROUP BY i.id
  `, [slug])

  await pool.end()

  return {
    id: 0,
    title: 'Результаты поиска',
    goods: goodsSQL.rows.map((g: { id: number, title: string, img: string, price: number, total: number, total_reviews: number }) => ({
      id: g.id,
      title: g.title,
      img: g.img,
      price: g.price,
      rating: {
        total: g.total,
        total_reviews: g.total_reviews
      }
    }))
  }
})
