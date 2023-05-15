import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id товара'
    })
  }

  const token = getCookie(event, 'token')
  if (!isValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = getInfoFromToken(token!)

  setCookie(event, 'token', generateToken(tokenInfo!.id))

  // Занесение / удаление из списка избранных

  const mockFavourites = [
    {
      id: 1,
      title: 'Банан',
      img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
      rating: {
        total: 4.5,
        total_reviews: 2
      }
    },
    {
      id: 2,
      title: 'Яблоко',
      img: '',
      rating: {
        total: 0,
        total_reviews: 0
      }
    }
  ]

  return mockFavourites
})
