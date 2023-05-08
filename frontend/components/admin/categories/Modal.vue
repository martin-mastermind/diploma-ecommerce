<script setup lang="ts">
import { useCategories } from '~/store/admin/categories'

import { useCategory } from '~/composables/admin/useCategory'

const props = defineProps<{
    isOpened: boolean
    id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])
const { data, cannotSave, save, clear } = useCategory()

const categoriesStore = useCategories()
watch(() => props.isOpened, () => {
  if (!props.isOpened) { return }
  categoriesStore.getCategories()
  clear()

  if (props.id === 0) { return }
  categoriesStore.getCategory(props.id)
})

const categoriesOptions = computed(() => {
  const result: {key: number, name: string, value: number}[] = []

  for (const category of categoriesStore.categories) {
    if (category.id === props.id) { continue }

    result.push({
      key: category.id,
      name: category.title,
      value: category.id
    })
  }

  return result
})

async function askDelete () {
  if (!props.id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await categoriesStore.deleteCategory(props.id)) { return }

  emit('refetchList')
  emit('update:isOpened', false)
}

async function saveChanges () {
  if (!await save(props.id)) { return }

  emit('refetchList')
  emit('update:isOpened', false)
}
</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] h-[90%] bg-slate-100 rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center text-3xl">
        <h2>Редактирование категории</h2>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5">
        <AdminUiInput
          id="title"
          v-model="data.title"
          type="text"
          label="Наименование"
        />
        <AdminUiDropdown
          id="category_id"
          v-model="data.parent_category_id"
          label="Родительская категория"
          :options="categoriesOptions"
        />
      </article>
      <footer class="mt-auto flex w-full justify-end gap-5">
        <button v-if="id" class="bg-red-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-red-600 active:bg-red-700" @click="askDelete">
          Удалить
        </button>
        <button :disabled="cannotSave" class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700" @click="saveChanges">
          Сохранить
        </button>
      </footer>
    </section>
  </div>
</template>
