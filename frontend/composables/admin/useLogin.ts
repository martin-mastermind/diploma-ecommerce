import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minLength } from '@vuelidate/validators'
import { useUser } from '~/store/admin/user'

export function useLogin () {
  const data = ref({
    id: {
      type: 'text',
      label: 'Личный идентификатор',
      value: ''
    },
    password: {
      type: 'password',
      label: 'Пароль',
      value: ''
    }
  })

  const pending = ref(false)

  const rules = {
    id: {
      value: { required, numeric }
    },
    password: {
      value: { required, minLengthValue: minLength(8) }
    }
  }
  const validator = useVuelidate(rules, data)

  const cannotLogin = computed(() => pending.value || validator.value.$invalid)

  async function login () {
    if (cannotLogin.value) { return }

    const { loginUser } = useUser()

    pending.value = true
    const result = await loginUser(+data.value.id.value, data.value.password.value)
    pending.value = false

    if (!result) { return }
    await useRouter().push('/admin')
  }

  return { data, validator, cannotLogin, login }
}
