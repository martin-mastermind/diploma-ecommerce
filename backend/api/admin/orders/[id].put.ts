import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id заказа'
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

  const body = await readBody<{ id: number, status: 'new' | 'in-work' | 'success' | 'canceled' }>(event)

  const props = ['id', 'status'] as Array<keyof { id: number, status: 'new' | 'in-work' | 'success' | 'canceled' }>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool()
  const orderSQL = await pool.query('SELECT status FROM "Orders" WHERE id = $1 AND status <> \'canceled\'', [+id])

  if (orderSQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Заказ недоступен'
    })
  }

  const orderStatus = orderSQL.rows[0].status

  if (orderStatus === 'canceled' || orderStatus === 'success') {
    throw createError({
      statusCode: 400,
      message: 'Изменение статуса невозможно'
    })
  }

  if (orderStatus === 'in-work' && body.status === 'new') {
    throw createError({
      statusCode: 400,
      message: 'Изменение статуса невозможно'
    })
  }

  await pool.query('UPDATE "Orders" SET status = $2 WHERE id = $1', [+id, body.status])

  await pool.end()

  return true
})
