import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id обращения'
    })
  }

  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }

  const tokenInfo = getInfoFromToken(token!)
  setCookie(event, 'token', generateToken(tokenInfo!.id))

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  await pool.query('UPDATE "Appeals" SET status = \'closed\' WHERE id = $1 AND admin_id = $2', [+id, tokenInfo!.id])
  await pool.end()

  return true
})
