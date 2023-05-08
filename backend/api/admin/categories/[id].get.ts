import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  setCookie(event, 'token', generateToken(getInfoFromToken(token!)!.id))

  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id категории'
    })
  }

  const mockCategories = [
    {
      id: 1,
      title: 'Фрукты',
      parent_category_id: null
    },
    {
      id: 2,
      title: 'Молочные продукты',
      parent_category_id: null
    },
    {
      id: 3,
      title: 'Йогурты',
      parent_category_id: 2
    }
  ]

  const category = mockCategories.find(c => c.id === +id)

  if (category == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти категорию'
    })
  }

  return category
})
