export { }

declare global {
  interface AdminUser {
    id: number
    last_name: string
    first_name: string
    patronymic: string | null
    type: string
  }

  interface User {
    id: number
    name: string
    phone: string
    email: string
  }

  interface UserDelivery {
    id: number
    user_id: number
    city: string
    street: string
    house: number
    entrance: number
    floor: number
    apartment: number
    commentary: string
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

  interface OrderUser {
    name: string
    phone: string
    email: string
  }

  interface OrderUserDelivery {
    city: string
    street: string
    house: number
    entrance: number
    floor: number
    apartment: number
    commentary: string
  }

  interface OrderGood {
    title: string
    category: string | null
    vendor_code: string
    price: number
    amount: number
  }

  interface OrderRule {
    category: string
    discount: number
  }

  interface OrderCoupon {
    code: string
    total_discount: number
    rules: OrderRule[]
  }

  interface OrderPreview {
    id: number
    user: OrderUser
  }

  interface Order extends OrderPreview {
    user_delivery: OrderUserDelivery
    coupon: OrderCoupon | null
    pay_type: 'cash' | 'card'
    delivery_date: string
    delivery_from_time: string
    delivery_to_time: string
    status: 'new' | 'in-work' | 'success' | 'canceled'
    goods: OrderGood[]
  }

  interface AppealPreview {
    id: number
    user: OrderUser
  }

  interface AppealMessage {
    from_admin: boolean
    sent_time: string
    message: string
  }

  interface Appeal extends AppealPreview {
    messages: AppealMessage[]
    status: 'new' | 'in-work' | 'closed'
  }

  namespace Client {
    interface Rule {
      category: string
      discount: number
    }

    interface PromotionPreview {
      id: number
      img: string
    }

    interface Promotion {
      title: string
      message: string
      img: string
      total_discount: number
      rules: Rule[]
    }

    interface GoodReview {
      name: string
      message: string
      rating: number
    }

    interface GoodRating {
      total: number
      total_reviews: number
      reviews?: GoodReview[]
    }

    interface GoodPreview {
      id: number
      title: string
      img: string
      price?: number
      rating?: GoodRating
    }

    interface Good extends GoodPreview {
      vendor_code: string
      origin_country: string
      description: string
      characteristic: string
      price: number
      weight: string
      rating: GoodRating
    }

    interface Comparison {
      id: number
      title: string
      img: string
      characteristic: string
      weight: string
      price: number
    }

    interface Category {
      id: number
      title: string
      children?: Category[]
    }

    interface Catalog {
      title: string
      goods: GoodPreview[]
    }

    type CatalogSortType = 'default' | 'price-down' | 'price-up' | 'rating'

    interface CatalogSort {
      type: CatalogSortType
      title: string
    }

    interface CatalogFilter {
      from: number
      to: number
    }

    interface User {
      id: number
      name: string
      phone: string
      email: string
    }

    interface UserData {
      name: string
      phone: string
      email: string
      password: string
    }

    interface CartItem {
      id: number
      amount: number
    }

    interface CartListItem extends CartItem {
      title: string
      price: number
      img: string
    }

    interface OrderInfo {
      userDelivery: number | null
      payType: 'cash' | 'card'
      coupon: string | null
      deliveryDate: string | null
      deliveryTimeFrom: string | null
      deliveryTimeTo: string | null
    }

    interface OrderData extends OrderInfo {
      goods: CartItem[]
    }

    interface UserDelivery {
      id: number
      city: string
      street: string
      house: number
      entrance: number
      floor: number
      apartment: number
    }

    interface UserDeliveryFull extends UserDelivery {
      commentary: string
    }

    interface Order {
      id: number
      total: number
      delivery_date: string
      delivery_from_time: string
      delivery_to_time: string
      status: 'new' | 'in-work' | 'success' | 'canceled'
    }
  }
}
