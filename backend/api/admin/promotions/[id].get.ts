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
      message: 'Не указан id акции'
    })
  }

  const mockPromotions = [
    {
      id: 1,
      title: '9 Мая',
      img: '',
      message: '',
      total_discount: 5,
      status: 'active',
      rules: [
        {
          id: 1,
          category_id: 1,
          discount: 10
        }
      ]
    }
  ]

  const promotion = mockPromotions.find(p => p.id === +id)

  if (promotion == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти акцию'
    })
  }

  return promotion
})
