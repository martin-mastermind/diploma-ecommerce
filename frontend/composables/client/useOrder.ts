import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minLength } from '@vuelidate/validators'
import { useListen } from '~/composables/utils/useEventBus'
import { useCart } from '~/store/client/cart'

export function useOrder () {
  const data = ref<Client.OrderInfo>({
    userDelivery: null,
    payType: 'cash',
    coupon: null,
    deliveryDate: null,
    deliveryTimeFrom: null,
    deliveryTimeTo: null
  })

  useListen('cart:update', (event) => {
    if (event.userDelivery !== undefined) { data.value.userDelivery = event.userDelivery }
    if (event.payType !== undefined) { data.value.payType = event.payType }
    if (event.coupon !== undefined) { data.value.coupon = event.coupon }
    if (event.deliveryDate !== undefined) { data.value.deliveryDate = event.deliveryDate }
    if (event.deliveryTimeFrom !== undefined) { data.value.deliveryTimeFrom = event.deliveryTimeFrom }
    if (event.deliveryTimeTo !== undefined) { data.value.deliveryTimeTo = event.deliveryTimeTo }
  })

  const pending = ref(false)

  const isValidDate = (value: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(value)
  const isValidTime = (value: string) => /^\d{2}:\d{2}$/.test(value)

  const rules = {
    userDelivery: { required, numeric },
    payType: { required },
    coupon: { minLength: minLength(1) },
    deliveryDate: { required, isValidDate },
    deliveryTimeFrom: { required, isValidTime },
    deliveryTimeTo: { required, isValidTime }
  }
  const validator = useVuelidate(rules, data)

  const cannotOrder = computed(() => pending.value || validator.value.$invalid)

  async function order () {
    if (cannotOrder.value) { return }

    const { orderCart } = useCart()

    pending.value = true
    const result = await orderCart(data.value)
    pending.value = false

    if (!result) { return }

    await navigateTo('/')
  }

  return { cannotOrder, order }
}
