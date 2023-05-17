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

  const tokenInfo = getInfoFromToken(token!)
  setCookie(event, 'token', generateToken(tokenInfo!.id))

  const body = await readBody<{ id: number, message: string }>(event)

  const props = ['id', 'message'] as Array<keyof { id: number, message: string }>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool()
  await pool.query('UPDATE "Appeals" SET admin_id = $2, status = \'in-work\' WHERE id = $1 AND status = \'new\'', [body.id, tokenInfo!.id])

  const appealSQL = await pool.query('SELECT id FROM "Appeals" WHERE id = $1 AND admin_id = $2', [body.id, tokenInfo!.id])
  if (appealSQL.row.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Обращение недоступно'
    })
  }

  await pool.query('INSERT INTO "Appeal_Messages"(appeal_id, from_admin, message) VALUES ($1, \'true\', $2)', [body.id, body.message])

  await pool.end()

  return true
})
