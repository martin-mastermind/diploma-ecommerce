import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id категории'
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

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  const categorySQL = await pool.query('SELECT * FROM "Categories" WHERE id = $1', [+id])

  await pool.end()

  if (categorySQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти категорию'
    })
  }

  return categorySQL.rows[0]
})
