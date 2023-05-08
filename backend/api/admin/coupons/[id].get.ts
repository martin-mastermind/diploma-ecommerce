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
      message: 'Не указан id купона'
    })
  }

  const mockCoupons = [
    {
      id: 1,
      title: 'Для новых',
      code: 'new-user',
      use_amount: 1000,
      total_discount: 10,
      rules: [
        {
          id: 1,
          category_id: 2,
          discount: 2
        }
      ]
    }
  ]

  const coupon = mockCoupons.find(p => p.id === +id)

  if (coupon == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти купон'
    })
  }

  return coupon
})
