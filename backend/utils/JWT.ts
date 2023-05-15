import { createHmac } from 'crypto'

export class JWT {
  userType: 'admin' | 'client'
  hmacSalt: string
  validBy = 86_400_000 // 1 день

  constructor (userType: 'admin' | 'client', hmacSalt: string) {
    this.userType = userType
    this.hmacSalt = hmacSalt
  }

  private stringToBase64 (data: string) {
    return Buffer.from(data, 'utf-8').toString('base64')
  }

  private base64ToString (data: string) {
    return Buffer.from(data, 'base64').toString('utf-8')
  }

  generateToken (userId: number) {
    const infoPart = this.stringToBase64(JSON.stringify({
      id: userId,
      userType: this.userType
    }))

    const timePart = this.stringToBase64(JSON.stringify({
      validBy: this.validBy,
      start: new Date().getTime()
    }))

    const mainPart = `${infoPart}.${timePart}`

    const signaturePart = createHmac('sha256', this.hmacSalt).update(mainPart).digest('base64')

    return `${mainPart}.${signaturePart}`
  }

  isValidToken (token: string | undefined) {
    if (token === undefined) { return false }

    const parts = token.split('.')
    if (parts.length !== 3) { return false }

    const signaturePart = createHmac('sha256', this.hmacSalt).update(`${parts[0]}.${parts[1]}`).digest('base64')
    if (signaturePart !== parts[2]) { return false }

    try {
      const timePart = JSON.parse(this.base64ToString(parts[1])) as { start: number, validBy: number }
      if (timePart.start === undefined || timePart.validBy === undefined) { return false }

      if (timePart.start + timePart.validBy <= new Date().getTime()) { return false }
    } catch {
      return false
    }

    const infoPart = getInfoFromToken(token)
    return infoPart !== null && infoPart.userType === this.userType && !isNaN(infoPart.id)
  }

  getInfoFromToken (token: string): { userType: 'admin' | 'user', id: number } | null {
    const parts = token.split('.')
    try {
      return JSON.parse(this.base64ToString(parts[0]))
    } catch {
      return null
    }
  }
}
