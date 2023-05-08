<script setup lang="ts">
import { usePromotions } from '~/store/admin/promotions'
import { useCategories } from '~/store/admin/categories'

import { usePromotion } from '~/composables/admin/usePromotion'

const props = defineProps<{
    isOpened: boolean
    id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])
const { data, cannotSave, save, clear } = usePromotion()

const categoriesStore = useCategories()
const promotionsStore = usePromotions()
watch(() => props.isOpened, () => {
  if (!props.isOpened) { return }
  categoriesStore.getCategories()
  clear()

  if (props.id === 0) { return }
  promotionsStore.getPromotion(props.id)
})

const statuses = computed(() => [
  {
    key: 'new',
    name: 'Создана',
    value: 'new'
  },
  {
    key: 'active',
    name: 'Активна',
    value: 'active'
  },
  {
    key: 'finished',
    name: 'Завершена',
    value: 'finished'
  }
])

async function askDelete () {
  if (!props.id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await promotionsStore.deletePromotion(props.id)) { return }

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
        <h2>Редактирование акции</h2>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5">
        <AdminUiImageInput
          id="img"
          v-model="data.img"
          label="Изображение"
        />
        <div class="grid grid-cols-2 gap-2">
          <AdminUiInput
            id="title"
            v-model="data.title"
            type="text"
            label="Наименование"
          />
          <AdminUiInput
            id="total_discount"
            v-model="data.total_discount"
            type="number"
            label="Общая скидка (в %)"
          />
          <AdminUiDropdown
            id="status"
            v-model="data.status"
            label="Статус"
            :options="statuses"
          />
        </div>
        <AdminUiTextArea
          id="message"
          v-model="data.message"
          label="Информационное сообщение"
        />
        <AdminPromotionsRules v-model:rules="data.rules" />
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
