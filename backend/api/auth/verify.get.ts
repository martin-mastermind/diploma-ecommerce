import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = getCookie(event, 'token')

  if (!clientIsValidToken(token)) {
    return false
  }

  const tokenUserId = clientGetInfoFromToken(token!)!.id
  const queryUserId = query.id?.toString() ?? ''

  if (!isNaN(parseInt(queryUserId)) && tokenUserId !== +queryUserId) {
    deleteCookie(event, 'token')
    return false
  }

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })

  const userSQL = await pool.query('SELECT id, name, email, phone FROM "Users" WHERE id = $1', [tokenUserId])
  if (userSQL.rows.length === 0) {
    await pool.end()
    deleteCookie(event, 'token')
    return false
  }
  await pool.end()

  const user = userSQL.rows[0]

  setCookie(event, 'token', clientGenerateToken(user.id))

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email
  }
})
