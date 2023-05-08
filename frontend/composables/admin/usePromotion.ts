import { useVuelidate } from '@vuelidate/core'
import { required, numeric, url, maxLength, minValue, maxValue } from '@vuelidate/validators'
import { usePromotions } from '~/store/admin/promotions'

export function usePromotion () {
  const promotionsStore = usePromotions()

  const data = ref<Promotion>({
    id: 0,
    img: '',
    title: '',
    total_discount: 0,
    status: 'new',
    message: '',
    rules: []
  })

  watch(() => promotionsStore.currentPromotion, () => {
    if (promotionsStore.currentPromotion == null) { return }
    data.value = promotionsStore.currentPromotion
  })

  const pending = ref(false)

  const withoutDuplicates = (value: PromotionRule[]) => {
    const uniqueIds = new Set(value.map(v => +v.category_id))
    return uniqueIds.size === value.length
  }
  const notEmptyCategory = (value: PromotionRule[]) => value.every(v => +v.category_id > 0)

  const rules = {
    img: { url },
    title: { required, maxLength: maxLength(50) },
    total_discount: { numeric, minValue: minValue(0), maxValue: maxValue(100) },
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
    const result = id === 0 ? await promotionsStore.addPromotion(sendData) : await promotionsStore.updatePromotion(sendData)
    pending.value = false

    return result
  }

  function clear () {
    data.value = {
      id: 0,
      img: '',
      title: '',
      total_discount: 0,
      status: 'new',
      message: '',
      rules: []
    }
  }

  return { data, validator, cannotSave, save, clear }
}
