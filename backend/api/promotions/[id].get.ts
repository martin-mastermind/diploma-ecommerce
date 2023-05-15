export default defineEventHandler((event) => {
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
      title: '9 мая',
      message: 'Акция, приуроченная к празднику 9 мая! Отметь праздник, купив акционные товары.',
      img: 'https://www.belrynok.by/wp-content/uploads/2018/05/den_pobedy.jpg',
      total_discount: 10,
      rules: [
        {
          category: 'Фрукты',
          discount: 15
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
