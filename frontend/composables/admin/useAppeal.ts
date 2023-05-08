import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useAppeals } from '~/store/admin/appeals'

export function useAppeal () {
  const appealsStore = useAppeals()

  const data = ref({
    message: ''
  })

  watch(() => appealsStore.currentAppeal, () => {
    if (appealsStore.currentAppeal == null) { return }

    data.value.message = ''
  })

  const pending = ref(false)

  const rules = {
    message: { required }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save () {
    if (cannotSave.value) { return }

    pending.value = true
    const result = await appealsStore.sendMessage(data.value.message)
    pending.value = false

    return result
  }

  return { data, validator, cannotSave, save }
}
