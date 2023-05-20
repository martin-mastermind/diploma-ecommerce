import * as pg from 'pg'
const { Pool } = pg.default

export default defineEventHandler(async () => {
  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })

  const categoriesSQL = await pool.query('SELECT id, title FROM "Categories"')

  categoriesSQL.rows.map(async (c: { id: number, title: string }) => {
    const childSQL = await pool.query('SELECT id, title FROM "Categories" WHERE parent_category_id = $1', [c.id])

    return {
      id: c.id,
      title: c.title,
      children: childSQL.rows
    }
  })

  await pool.end()

  return categoriesSQL.rows
})
