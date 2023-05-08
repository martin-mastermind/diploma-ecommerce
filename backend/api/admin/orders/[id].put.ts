import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  setCookie(event, 'token', generateToken(getInfoFromToken(token!)!.id))

  const id = event.context.params?.id
  const body = await readBody<{ id: number, status: 'new' | 'in-work' | 'success' | 'canceled' }>(event)

  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id заказа'
    })
  }

  const props = ['id', 'status'] as Array<keyof { id: number, status: 'new' | 'in-work' | 'success' | 'canceled' }>
  for (const prop of props) {
    if (body[prop] == null) {
      throw createError({
        statusCode: 400,
        message: `Не указано поле ${prop}`
      })
    }
  }

  // Обновить запись по ID в БД

  return true
})
