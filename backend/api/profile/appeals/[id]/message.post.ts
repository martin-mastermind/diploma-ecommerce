import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'
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
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const body = await readBody<{ text: string }>(event)
  if (body.text == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле text'
    })
  }

  const pool = new Pool()
  let appealId = +id
  if (appealId === 0) {
    const appealSQL = await pool.query('INSERT INTO "Appeals"(user_id) VALUES ($1) RETURNING id', [tokenInfo!.id])
    if (appealSQL.rows.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Не удалось создать обращение'
      })
    }

    appealId = +appealSQL.rows[0].id
  }

  await pool.query('INSERT INTO "Appeal_Messages"(from_admin, message) VALUES (\'false\', $1)', [body.text])

  const appealSQL = await pool.query(`
    SELECT a.id, CONCAT(adm.last_name, ' ', adm.first_name, ' ', adm.patronymic) admin_name, a.status 
    FROM "Appeals" a
    JOIN "Administrators" adm ON a.admin_id = adm.id
    WHERE id = $1 AND user_id = $2
  `, [appealId, tokenInfo!.id])
  if (appealSQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти обращение'
    })
  }

  const appeal = appealSQL.rows[0]

  const messagesSQL = await pool.query('SELECT from_admin, sent_time, message FROM "Appeal_Messages" WHERE appeal_id = $1', [appeal.id])

  await pool.end()

  return {
    ...appeal,
    messages: messagesSQL.rows
  }
})
