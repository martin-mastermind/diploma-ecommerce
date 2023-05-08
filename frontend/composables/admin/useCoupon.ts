import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxLength, minValue, maxValue } from '@vuelidate/validators'
import { useCoupons } from '~/store/admin/coupons'

export function useCoupon () {
  const couponsStore = useCoupons()

  const data = ref<Coupon>({
    id: 0,
    title: '',
    total_discount: 0,
    code: '',
    use_amount: 0,
    rules: []
  })

  watch(() => couponsStore.currentCoupon, () => {
    if (couponsStore.currentCoupon == null) { return }
    data.value = couponsStore.currentCoupon
  })

  const pending = ref(false)

  const withoutDuplicates = (value: Rule[]) => {
    const uniqueIds = new Set(value.map(v => +v.category_id))
    return uniqueIds.size === value.length
  }
  const notEmptyCategory = (value: Rule[]) => value.every(v => +v.category_id > 0)

  const rules = {
    title: { required, maxLength: maxLength(50) },
    total_discount: { numeric, minValue: minValue(0), maxValue: maxValue(100) },
    use_amount: { required, minValue: minValue(0) },
    code: { required, maxLength: maxLength(64) },
    rules: { withoutDuplicates, notEmptyCategory }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save (id: number) {
    if (cannotSave.value) { return }

    const sendData = {
      ...data.value,
      id,
      total_discount: +data.value.total_discount
    }

    pending.value = true
    const result = id === 0 ? await couponsStore.addCoupon(sendData) : await couponsStore.updateCoupon(sendData)
    pending.value = false

    return result
  }

  function clear () {
    data.value = {
      id: 0,
      title: '',
      total_discount: 0,
      code: '',
      use_amount: 0,
      rules: []
    }
  }

  return { data, validator, cannotSave, save, clear }
}
