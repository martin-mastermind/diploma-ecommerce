import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  setCookie(event, 'token', generateToken(getInfoFromToken(token!)!.id))

  const body = await readBody<Category>(event)

  const props = ['title'] as Array<keyof Category>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  await pool.query('INSERT INTO "Categories"(title, parent_category_id) VALUES ($1, $2)', [body.title, body.parent_category_id])

  await pool.end()

  return true
})
