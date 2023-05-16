import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ApplicationEvents = {
  'catalog:dropdown': 'sort' | 'filter'
  'catalog:update': {
    sort?: Client.CatalogSortType
    filter?: Client.CatalogFilter
  }
  'auth:modal': boolean
  'auth:type': 'login' | 'registration'
  'cart:update': {
    userDelivery?: number
    payType?: 'cash' | 'card'
    coupon?: string | null
    deliveryDate?: string | null
    deliveryTimeFrom?: string | null
    deliveryTimeTo?: string | null
  }
}

const emitter = mitt<ApplicationEvents>()

export const useEvent = emitter.emit
export const useListen = emitter.on
