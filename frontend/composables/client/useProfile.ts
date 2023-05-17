import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useUser } from '~/store/client/user'

export function useProfile () {
  const userStore = useUser()
  const data = ref<Client.UserData>({
    name: userStore.user!.name,
    phone: userStore.user!.phone,
    email: userStore.user!.email,
    password: ''
  })

  const pending = ref(false)

  const isValidPhone = (value: string) => /^375[\d]{9}$/.test(value)

  const rules = {
    name: { required },
    phone: { required, isValidPhone },
    email: { required, email },
    password: { minLength: minLength(8) }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  watch(data, save, { deep: true })

  async function save () {
    if (cannotSave.value) { return false }

    pending.value = true
    const result = await userStore.updateUser({ ...data.value })
    pending.value = false

    return result
  }

  return { data }
}
