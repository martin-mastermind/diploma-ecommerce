import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minLength, minValue } from '@vuelidate/validators'
import { useDeliveries } from '~/store/client/deliveries'

export function useDelivery () {
  const data = ref<Client.UserDeliveryFull>({
    id: 0,
    city: '',
    street: '',
    house: 0,
    entrance: 0,
    floor: 0,
    apartment: 0,
    commentary: ''
  })

  const deliveriesStore = useDeliveries()

  watch(() => deliveriesStore.currentDelivery, () => {
    data.value = deliveriesStore.currentDelivery ?? {
      id: 0,
      city: '',
      street: '',
      house: 0,
      entrance: 0,
      floor: 0,
      apartment: 0,
      commentary: ''
    }
  }, {
    deep: true
  })

  const pending = ref(false)

  const rules = {
    city: { required, minLength: minLength(1) },
    street: { required, minLength: minLength(1) },
    house: { required, numeric, minValue: minValue(1) },
    entrance: { required, numeric, minValue: minValue(1) },
    floor: { required, numeric, minValue: minValue(1) },
    apartment: { required, numeric, minValue: minValue(1) }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save () {
    if (cannotSave.value) { return false }

    const { getDeliveries, addDelivery, updateDelivery } = useDeliveries()

    pending.value = true
    const result = data.value.id === 0 ? await addDelivery({ ...data.value }) : await updateDelivery({ ...data.value })
    if (result) { await getDeliveries() }
    pending.value = false

    return result
  }

  return { data, cannotSave, save }
}
