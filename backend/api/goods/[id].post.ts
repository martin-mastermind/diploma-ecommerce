import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id товара'
    })
  }

  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const body = await readBody<{ rating?: string, message?: string }>(event)

  if (body.rating == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле rating'
    })
  }

  if (body.message == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле message'
    })
  }

  // Занести новый отзыв: id - ID товара, tokenInfo.id - ID пользователя, rating - оценка, message - текст отзыва

  const mockGoods = [
    {
      id: 1,
      title: 'Банан',
      vendor_code: 'G-1000',
      img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
      origin_country: 'Зимбабве',
      price: 2.5,
      description: 'Свежая спаржа хрустящая и сочная. Запах нейтральный. Обладает свежим, ореховым и сладковатым вкусом. Спаржу можно есть в сыром в виде. Если хочется термически обработать продукт, её можно приготовить на гриле, запечь, потушить или отварить в течение 15-20 минут. Важно: в пищу употребляется только верхняя часть растения.',
      characteristic: `Пищевая ценность на 100 г
      Белки: 1.5
      Жиры: 0.5
      Углеводы: 21
      Энергетическая ценность: 89 ккал / 372 кДж`,
      weight: '1-1.2 кг',
      rating: {
        total: 4.4,
        total_reviews: 2,
        reviews: [
          {
            name: 'Мартин',
            message: 'Вкусные бананы',
            rating: 5
          },
          {
            name: 'Максим',
            message: 'Бананы такие себе, за такую цену сойдет, но больше брать их не буду.',
            rating: 4
          }
        ]
      }
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
