import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const token = getCookie(event, 'token')

  if (!clientIsValidToken(token)) {
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

  const tokenUserId = clientGetInfoFromToken(token!)!.id
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

  setCookie(event, 'token', clientGenerateToken(user.id))

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email
  }
})
