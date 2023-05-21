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

  const body = getQuery(event)

  if (body.ids == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле ids'
    })
  }

  try {
    const ids = JSON.parse(decodeURI(body.ids as string)) as number[]
    const pool = new Pool({
      ssl: {
        mode: 'require'
      }
    })

    const goodsSQL = await pool.query(`SELECT id, title, img, price FROM "Items" WHERE id IN (${ids.join(', ')})`)
    await pool.end()

    return goodsSQL.rows
  } catch {
    throw createError({
      statusCode: 400,
      message: 'Неверное поле ids'
    })
  }
})
