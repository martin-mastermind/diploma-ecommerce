export { }

declare global {
  interface AdminUser {
    id: number
    last_name: string
    first_name: string
    patronymic: string | null
    type: string
  }

  interface GoodPreview {
    id: number
    title: string
    vendor_code: string
  }
}
