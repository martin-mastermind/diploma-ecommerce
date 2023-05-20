import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })

  const goodsSQL = await pool.query(`
    SELECT i.id, title, img, price, COALESCE(ROUND(AVG(score), 2),0) total, COALESCE(COUNT(score),0) total_reviews
    FROM "Items" i
    LEFT JOIN "Item_Reviews" ir ON ir.item_id = i.id
    JOIN "User_Favourite_Items" ufi ON ufi.item_id = i.id
    WHERE ufi.user_id = $1
    GROUP BY i.id
  `, [tokenInfo!.id])

  await pool.end()

  const goods = goodsSQL.rows.map((g: { id: number, title: string, img: string, price: number, total: number, total_reviews: number }) => ({
    id: g.id,
    title: g.title,
    img: g.img,
    price: g.price,
    rating: {
      total: g.total,
      total_reviews: g.total_reviews
    }
  }))

  return goods
})
