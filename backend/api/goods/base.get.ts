export default defineEventHandler(() => {
  const mockGoods = [
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

  return mockGoods
})
