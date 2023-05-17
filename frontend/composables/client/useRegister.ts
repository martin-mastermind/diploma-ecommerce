import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useUser } from '~/store/client/user'

export function useRegister () {
  const data = ref({
    name: null as string | null,
    phone: null as string | null,
    email: null as string | null,
    password: null as string | null
  })

  const pending = ref(false)

  const isValidPhone = (value: string) => /^375[\d]{9}$/.test(value)

  const rules = {
    name: { required },
    phone: { required, isValidPhone },
    email: { required, email },
    password: { required, minLength: minLength(8) }
  }
  const validator = useVuelidate(rules, data)

  const cannotRegister = computed(() => pending.value || validator.value.$invalid)

  async function register () {
    if (cannotRegister.value) { return }

    const { registerUser } = useUser()

    pending.value = true
    const result = await registerUser(data.value.name!, data.value.email!, data.value.phone!, data.value.password!)
    pending.value = false

    if (!result) { return }
    location.reload()
  }
  return { data, cannotRegister, register }
}
