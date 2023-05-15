export default defineEventHandler(() => {
  const mockCategories = [
    {
      id: 1,
      title: 'Фрукты и овощи',
      children: [
        {
          id: 10,
          title: 'Фрукты'
        },
        {
          id: 11,
          title: 'Овощи'
        }
      ]
    },
    {
      id: 2,
      title: 'Молочные продукты',
      children: []
    }
  ]

  return mockCategories
})
