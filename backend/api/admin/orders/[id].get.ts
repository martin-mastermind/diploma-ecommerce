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
      message: 'Не указан id заказа'
    })
  }

  const mockOrders = [
    {
      id: 1,
      user: {
        name: 'Мартин',
        phone: '+375 25 707 5176',
        email: 'martbelmoaw@gmail.com'
      },
      user_delivery: {
        city: 'Минск',
        street: 'Пулихова',
        house: 31,
        entrance: 2,
        floor: 7,
        apartment: 45,
        commentary: 'корпус 1'
      },
      coupon: {
        code: 'new-user',
        total_discount: 10,
        rules: [
          {
            category: 'Фрукты',
            discount: 15
          }
        ]
      },
      pay_type: 'card',
      delivery_date: '09.05.2023',
      delivery_from_time: '11:00',
      delivery_to_time: '14:00',
      status: 'new',
      goods: [
        {
          title: 'Банан',
          category: 'Фрукты',
          vendor_code: 'G-1000',
          price: 2.5,
          amount: 2
        }
      ]
    }
  ]

  const order = mockOrders.find(o => o.id === +id)

  if (order == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти заказ'
    })
  }

  return order
})
