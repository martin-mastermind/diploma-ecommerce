import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { useCategories } from '~/store/admin/categories'

export function useCategory () {
  const categoriesStore = useCategories()

  const data = ref({
    parent_category_id: null as number | null,
    title: ''
  })

  watch(() => categoriesStore.currentCategory, () => {
    if (categoriesStore.currentCategory == null) { return }
    data.value = categoriesStore.currentCategory
  })

  const pending = ref(false)

  const rules = {
    title: { required, maxLength: maxLength(50) }
  }
  const validator = useVuelidate(rules, data)

  const cannotSave = computed(() => pending.value || validator.value.$invalid)

  async function save (id: number) {
    if (cannotSave.value) { return }

    const sendData = {
      id,
      title: data.value.title,
      parent_category_id: data.value.parent_category_id == null ? null : +data.value.parent_category_id
    }

    pending.value = true
    const result = id === 0 ? await categoriesStore.addCategory(sendData) : await categoriesStore.updateCategory(sendData)
    pending.value = false

    return result
  }

  function clear () {
    data.value = {
      parent_category_id: null as number | null,
      title: ''
    }
  }

  return { data, validator, cannotSave, save, clear }
}
