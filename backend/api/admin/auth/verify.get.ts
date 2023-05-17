import * as pg from 'pg'
import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = getCookie(event, 'token')

  if (!isValidToken(token)) {
    return false
  }

  const tokenUserId = getInfoFromToken(token!)!.id
  const queryUserId = query.id?.toString() ?? ''

  if (!isNaN(parseInt(queryUserId)) && tokenUserId !== +queryUserId) {
    deleteCookie(event, 'token')
    return false
  }

  const pool = new Pool()

  const userSQL = await pool.query('SELECT id, last_name, first_name, patronymic, type FROM "Administrators" WHERE id = $1', [tokenUserId])
  if (userSQL.rows.length === 0) {
    await pool.end()
    deleteCookie(event, 'token')
    return false
  }
  await pool.end()

  const user = userSQL.rows[0]

  setCookie(event, 'token', generateToken(user.id))

  return {
    id: user.id,
    last_name: user.last_name,
    first_name: user.first_name,
    patronymic: user.patronymic,
    type: user.type
  }
})
