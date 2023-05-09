import { generateToken, isValidToken, getInfoFromToken } from '~~/backend/utils/adminToken'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const token = getCookie(event, 'token')

  if (!isValidToken(token)) {
    return false
  }

  const mockUsers = [
    {
      id: 1,
      last_name: 'Mock',
      first_name: 'User',
      patronymic: null,
      type: 'full',
      password: 'daf6e3fa8a4a42748c389b4caffb0a7b6bc7de3bb981e20370d7a92acc595b37'
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
    last_name: user.last_name,
    first_name: user.first_name,
    patronymic: user.patronymic,
    type: user.type
  }
})
