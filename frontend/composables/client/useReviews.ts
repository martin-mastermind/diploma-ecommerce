import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minValue, maxValue } from '@vuelidate/validators'
import { useGoods } from '~/store/client/goods'

export function useReviews () {
  const data = ref({
    rating: null as string | null,
    message: ''
  })

  const pending = ref(false)

  const rules = {
    rating: { required, numeric, minValue: minValue(0), maxValue: maxValue(5) },
    message: { required }
  }
  const validator = useVuelidate(rules, data)

  const cannotSend = computed(() => pending.value || validator.value.$invalid)

  async function send () {
    if (cannotSend.value) { return }

    const goodsStore = useGoods()

    pending.value = true
    const result = await goodsStore.addGoodReview(+data.value.rating!, data.value.message)
    pending.value = false

    if (!result) { return }

    data.value.rating = null
    data.value.message = ''
  }
  return { data, cannotSend, send }
}
