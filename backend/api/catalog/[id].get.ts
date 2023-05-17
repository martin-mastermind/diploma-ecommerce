import * as pg from 'pg'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id категории'
    })
  }

  const pool = new Pool()

  const categorySQL = await pool.query('SELECT id, title FROM "Categories" WHERE id = $1', [+id])
  if (categorySQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти категорию'
    })
  }

  const category = categorySQL.rows[0]

  const goodsSQL = await pool.query(`
    SELECT i.id, title, img, price, COALESCE(AVG(score),0) total, COALESCE(COUNT(score),0) total_reviews 
    FROM "Items" i
    LEFT JOIN "Item_Reviews" ir ON ir.item_id = i.id
    WHERE i.category_id = $1 AND i.amount > 0
    GROUP BY i.id
  `, [+id])

  await pool.end()

  category.goods = goodsSQL.rows.map((g: { id: number, title: string, img: string, price: number, total: number, total_reviews: number }) => ({
    id: g.id,
    title: g.title,
    img: g.img,
    price: g.price,
    rating: {
      total: g.total,
      total_reviews: g.total_reviews
    }
  }))

  return category
})
