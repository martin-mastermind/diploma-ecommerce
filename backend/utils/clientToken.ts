import { JWT } from './JWT'

const jwt = new JWT('client', 'client-token')

export function generateToken (userId: number) {
  return jwt.generateToken(userId)
}

export function isValidToken (token: string | undefined) {
  return jwt.isValidToken(token)
}

export function getInfoFromToken (token: string) {
  return jwt.getInfoFromToken(token)
}
