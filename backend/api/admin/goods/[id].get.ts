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
      message: 'Не указан id товара'
    })
  }

  const mockGoods = [
    {
      id: 1,
      vendor_code: 'A-1000',
      category_id: null,
      title: 'Банан',
      img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
      origin_country: 'Африка',
      description: 'Вкусный бананчик!',
      characteristic: 'Содержит 500 Ккал',
      weight: '300-500 гр.',
      price: 2.45,
      amount: 100
    },
    {
      id: 2,
      vendor_code: 'G-1001',
      category_id: null,
      title: 'Яблоко',
      img: '',
      origin_country: 'Россия',
      description: 'Вкусное яблочко!',
      characteristic: '',
      weight: '',
      price: 1.89,
      amount: 82
    }
  ]

  const good = mockGoods.find(g => g.id === +id)

  if (good == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти товар'
    })
  }

  return good
})
