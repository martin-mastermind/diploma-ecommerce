import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useAppeals } from '~/store/client/appeals'

export function useAppeal () {
  const data = ref<{
    text: string | null
  }>({
    text: null
  })

  const appealsStore = useAppeals()

  watch(() => appealsStore.currentAppeal, () => {
    data.value.text = null
  }, {
    deep: true
  })

  const pending = ref(false)

  const rules = {
    text: { required, minLength: minLength(1) }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save () {
    if (cannotSave.value) { return false }

    pending.value = true
    const result = await appealsStore.sendAppealMessage(data.value.text!)
    pending.value = false

    return result
  }

  return { data, cannotSave, save }
}
