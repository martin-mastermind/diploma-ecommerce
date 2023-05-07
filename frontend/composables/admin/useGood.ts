import { useVuelidate } from '@vuelidate/core'
import { required, numeric, url, minLength, maxLength, minValue } from '@vuelidate/validators'
import { useGoods } from '~/store/admin/goods'

export function useGood () {
  const goodsStore = useGoods()

  const data = ref({
    img: '',
    category_id: null as number | null,
    title: '',
    vendor_code: '',
    origin_country: '',
    description: '',
    characteristic: '',
    weight: '',
    price: '' as number | string,
    amount: '' as number | string
  })

  watch(() => goodsStore.currentGood, () => {
    if (goodsStore.currentGood == null) { return }
    data.value = goodsStore.currentGood
  })

  const pending = ref(false)

  const rules = {
    img: { url },
    title: { required, maxLength: maxLength(50) },
    vendor_code: { required, maxLength: maxLength(50) },
    origin_country: { minLength: minLength(2) },
    price: { required, numeric, minValue: minValue(0.1) },
    amount: { required, numeric, minValue: minValue(0) }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save (id: number) {
    if (cannotSave.value) { return }

    const sendData = {
      ...data.value,
      id,
      category_id: data.value.category_id == null ? null : +data.value.category_id,
      price: +data.value.price,
      amount: +data.value.amount
    }

    pending.value = true
    const result = id === 0 ? await goodsStore.addGood(sendData) : await goodsStore.updateGood(sendData)
    pending.value = false

    return result
  }

  function clear () {
    data.value = {
      img: '',
      category_id: null as number | null,
      title: '',
      vendor_code: '',
      origin_country: '',
      description: '',
      characteristic: '',
      weight: '',
      price: '' as number | string,
      amount: '' as number | string
    }
  }

  return { data, validator, cannotSave, save, clear }
}
