import { JWT } from './JWT'

const jwt = new JWT('client', 'client-token')

export function clientGenerateToken (userId: number) {
  return jwt.generateToken(userId)
}

export function clientIsValidToken (token: string | undefined) {
  return jwt.isValidToken(token)
}

export function clientGetInfoFromToken (token: string) {
  return jwt.getInfoFromToken(token)
}
