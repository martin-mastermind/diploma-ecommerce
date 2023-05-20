import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id адреса'
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

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  await pool.query(`
    UPDATE "User_Deliveries" SET city = $3, street = $4, house = $5, entrance = $6, floor = $7, apartment = $8, commentary = $9
    WHERE id = $1 AND user_id = $2
  `, [+id, tokenInfo!.id, body.city, body.street, body.house, body.entrance, body.floor, body.apartment, body.commentary])
  await pool.end()

  return true
})
