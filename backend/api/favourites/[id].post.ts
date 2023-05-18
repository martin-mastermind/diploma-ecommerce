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

  const pool = new Pool()

  const favouriteSQL = await pool.query('SELECT id FROM "User_Favourite_Items" WHERE user_id = $1 AND item_id = $2', [tokenInfo!.id, +id])
  if (favouriteSQL.rows.length === 0) {
    await pool.query('INSERT INTO "User_Favourite_Items"(user_id, item_id) VALUES ($1, $2)', [tokenInfo!.id, +id])
  } else {
    await pool.query('DELETE FROM "User_Favourite_Items" WHERE id = $1', [favouriteSQL.rows[0].id])
  }

  const goods = await pool.query(`
    SELECT i.id, title, img, price, COALESCE(ROUND(AVG(score), 2),0) total, COALESCE(COUNT(score),0) total_reviews 
    FROM "Items" i
    LEFT JOIN "Item_Reviews" ir ON ir.item_id = i.id
    JOIN "User_Favourite_Items" ufi ON ufi.item_id = i.id
    WHERE ufi.user_id = $1
    GROUP BY i.id
  `, [tokenInfo!.id])

  return goods
})
