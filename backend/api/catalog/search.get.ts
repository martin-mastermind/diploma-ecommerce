export default defineEventHandler((event) => {
  const body = getQuery(event)

  if (body.slug == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле slug'
    })
  }

  const slug = body.slug as string

  const mockCatalog = [
    {
      id: 1,
      title: 'Фрукты и овощи',
      goods: [
        {
          id: 1,
          title: 'Банан',
          img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
          price: 2.5,
          rating: {
            total: 4.5,
            total_reviews: 2
          }
        },
        {
          id: 2,
          title: 'Яблоко',
          img: '',
          price: 1.89,
          rating: {
            total: 0,
            total_reviews: 0
          }
        }
      ]

    }
  ]

  const catalog = mockCatalog.find(c => c.goods.some(g => g.title.includes(slug)))

  if (catalog == null) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти товары'
    })
  }

  return catalog
})
