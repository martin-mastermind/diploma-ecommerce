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

  const body = await readBody<Client.UserDeliveryFull>(event)

  let prop: keyof Client.UserDeliveryFull
  for (prop in body) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  const pool = new Pool()
  await pool.query(`
    INSERT INTO "User_Deliveries"(user_id, city, street, house, entrance, floor, apartment, commentary)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [tokenInfo!.id, body.city, body.street, body.house, body.entrance, body.floor, body.apartment, body.commentary])

  return true
})
