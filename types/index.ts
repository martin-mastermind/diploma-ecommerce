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

  interface Good extends GoodPreview {
    img: string
    category_id: number | null
    origin_country: string
    description: string
    characteristic: string
    weight: string
    price: number
    amount: number
  }

  interface CategoryPreview {
    id: number
    title: string
  }

  interface Category extends CategoryPreview {
    parent_category_id: number | null
  }

  interface Rule {
    id: number
    category_id: number
    discount: number
  }

  interface PromotionPreview {
    id: number
    title: string
  }

  interface Promotion extends PromotionPreview {
    message: string
    img: string
    total_discount: number
    status: 'new' | 'active' | 'finished' | null
    rules: Rule[]
  }

  interface CouponPreview {
    id: number
    title: string
  }

  interface Coupon extends CouponPreview {
    code: string
    total_discount: number
    use_amount: number
    rules: Rule[]
  }
}
