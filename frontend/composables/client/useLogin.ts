import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useUser } from '~/store/client/user'

export function useLogin () {
  const data = ref({
    email: null as string | null,
    password: null as string | null
  })

  const pending = ref(false)

  const rules = {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  }
  const validator = useVuelidate(rules, data)

  const cannotLogin = computed(() => pending.value || validator.value.$invalid)

  async function login () {
    if (cannotLogin.value) { return }

    const { loginUser } = useUser()

    pending.value = true
    const result = await loginUser(data.value.email!, data.value.password!)
    pending.value = false

    if (!result) { return }
    location.reload()
  }
  return { data, cannotLogin, login }
}
