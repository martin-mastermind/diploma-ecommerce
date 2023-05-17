import * as pg from 'pg'
const { Pool } = pg.default

export default defineEventHandler(async () => {
  const pool = new Pool()

  const promotionsSQL = await pool.query('SELECT id, img FROM "Promotions" WHERE status = \'active\'')
  await pool.end()

  return promotionsSQL.rows
})
