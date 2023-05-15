export default defineEventHandler((event) => {
  const body = getQuery(event)

  if (body.ids == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле ids'
    })
  }

  const mockGoods = [
    {
      id: 1,
      title: 'Банан',
      img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
      characteristic: `Пищевая ценность на 100 г
  Белки: 1.5
  Жиры: 0.5
  Углеводы: 21
  Энергетическая ценность: 89 ккал / 372 кДж`,
      weight: '1-1.2 кг',
      price: 2.5
    },
    {
      id: 2,
      title: 'Яблоко',
      img: '',
      characteristic: '',
      weight: '',
      price: 1.89
    }
  ]

  return mockGoods
})
