import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const token = getCookie(event, 'token')

  if (!isValidToken(token)) {
    return false
  }

  const mockUsers = [
    {
      id: 1,
      name: 'Мартин',
      phone: '+375257075176',
      email: 'martbelmoaw@gmail.com'
    }
  ]

  const tokenUserId = getInfoFromToken(token!)!.id
  const queryUserId = query.id?.toString() ?? ''

  if (!isNaN(parseInt(queryUserId)) && tokenUserId !== +queryUserId) {
    deleteCookie(event, 'token')
    return false
  }

  const user = mockUsers.find(u => u.id === tokenUserId)

  if (user == null) {
    deleteCookie(event, 'token')
    return false
  }

  setCookie(event, 'token', generateToken(user.id))

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email
  }
})
