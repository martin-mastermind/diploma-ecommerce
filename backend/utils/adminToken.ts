import { createHmac } from 'crypto'

export function generateToken (userId: number) {
  const infoPart = Buffer.from(JSON.stringify({
    userType: 'admin',
    id: userId
  }), 'utf-8').toString('base64')

  const timePart = Buffer.from(JSON.stringify({
    start: new Date().getTime(),
    validBy: 86_400_000 // Токен доступен на 1 день
  }), 'utf-8').toString('base64')

  const mainPart = `${infoPart}.${timePart}`

  const signaturePart = createHmac('sha256', 'admin-token').update(mainPart).digest('base64')

  return `${mainPart}.${signaturePart}`
}

export function isValidToken (token: string | undefined) {
  if (token === undefined) { return false }

  const parts = token.split('.')
  if (parts.length !== 3) { return false }

  const signaturePart = createHmac('sha256', 'admin-token').update(`${parts[0]}.${parts[1]}`).digest('base64')
  if (signaturePart !== parts[2]) { return false }

  try {
    const timePart = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8')) as { start: number, validBy: number }
    if (timePart.start === undefined || timePart.validBy === undefined) { return false }

    if (timePart.start + timePart.validBy <= new Date().getTime()) { return false }
  } catch {
    return false
  }

  const infoPart = getInfoFromToken(token)
  return infoPart !== null && infoPart.userType === 'admin' && !isNaN(infoPart.id)
}

export function getInfoFromToken (token: string): { userType: 'admin' | 'user', id: number } | null {
  const parts = token.split('.')
  try {
    return JSON.parse(Buffer.from(parts[0], 'base64').toString('utf-8'))
  } catch {
    return null
  }
}
