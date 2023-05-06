export { }

declare global {
  interface AdminUser {
    id: number
    last_name: string
    first_name: string
    patronymic: string | null
    type: string
  }

  enum AdminUserAPI {
    LOGIN = '/api/admin/login',
    LOGOUT = '/api/admin/logout'
  }
}
