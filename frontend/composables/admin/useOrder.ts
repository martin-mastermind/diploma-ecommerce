import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useOrders } from '~/store/admin/orders'

export function useOrder () {
  const ordersStore = useOrders()

  const data = ref<Order>({
    id: 0,
    user: {
      name: '',
      phone: '',
      email: ''
    },
    user_delivery: {
      city: '',
      street: '',
      house: 0,
      entrance: 0,
      floor: 0,
      apartment: 0,
      commentary: ''
    },
    coupon: null,
    pay_type: 'cash',
    delivery_date: '',
    delivery_from_time: '',
    delivery_to_time: '',
    status: 'new',
    goods: []
  })

  watch(() => ordersStore.currentOrder, () => {
    if (ordersStore.currentOrder == null) { return }
    data.value = ordersStore.currentOrder
  })

  const pending = ref(false)

  const rules = {
    status: { required }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save (id: number) {
    if (cannotSave.value || +id <= 0) { return }

    const sendData = {
      id,
      status: data.value.status
    }

    pending.value = true
    const result = await ordersStore.updateOrder(sendData)
    pending.value = false

    return result
  }

  function clear () {
    data.value = {
      id: 0,
      user: {
        name: '',
        phone: '',
        email: ''
      },
      user_delivery: {
        city: '',
        street: '',
        house: 0,
        entrance: 0,
        floor: 0,
        apartment: 0,
        commentary: ''
      },
      coupon: null,
      pay_type: 'cash',
      delivery_date: '',
      delivery_from_time: '',
      delivery_to_time: '',
      status: 'new',
      goods: []
    }
  }

  return { data, validator, cannotSave, save, clear }
}
