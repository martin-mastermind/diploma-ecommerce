import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const body = getQuery(event)

  if (body.ids == null) {
    throw createError({
      statusCode: 400,
      message: 'Не указано поле ids'
    })
  }

  const mockCart = [
    {
      id: 1,
      title: 'Банан',
      img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
      price: 2.5
    },
    {
      id: 2,
      title: 'Яблоко',
      img: '',
      price: 1.89
    }
  ]

  return mockCart
})
