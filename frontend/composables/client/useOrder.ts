import { useEvent, useListen } from '~/composables/utils/useEventBus'

export function useOrder () {
  const data = ref({
    userDelivery: null as number | null,
    payType: 'cash' as 'cash' | 'card',
    coupon: null as string | null,
    deliveryDate: null as string | null,
    deliveryTimeFrom: null as string | null,
    delvieryTimeTo: null as string | null
  })

  return { data }
}
