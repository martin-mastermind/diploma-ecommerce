<script setup lang="ts">
import { useCategories } from '~/store/admin/categories'
import { useGoods } from '~/store/admin/goods'

import { useGood } from '~/composables/admin/useGood'

const props = defineProps<{
  isOpened: boolean
  id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])
const { getGood, deleteGood } = useGoods()
const { data, cannotSave, save, clear } = useGood()

const categoriesStore = useCategories()
watch(() => props.isOpened, () => {
  if (!props.isOpened) { return }
  categoriesStore.getCategories()
  clear()

  if (props.id === 0) { return }
  getGood(props.id)
})

const categoriesOptions = computed(() => categoriesStore.categories.map(c => ({
  key: c.id,
  name: c.title,
  value: c.id
})))

async function askDelete () {
  if (!props.id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await deleteGood(props.id)) { return }

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
        <h2>Редактирование товара</h2>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5">
        <AdminUiImageInput
          id="img"
          v-model="data.img"
          label="Изображение"
        />
        <AdminUiDropdown
          id="category_id"
          v-model="data.category_id"
          label="Категория"
          :options="categoriesOptions"
        />
        <div class="grid grid-cols-2 gap-2">
          <AdminUiInput
            id="title"
            v-model="data.title"
            type="text"
            label="Наименование"
          />
          <AdminUiInput
            id="vendor_code"
            v-model="data.vendor_code"
            type="text"
            label="Артикул"
          />
          <AdminUiInput
            id="origin_country"
            v-model="data.origin_country"
            type="text"
            label="Страна производства"
          />
          <AdminUiInput
            id="weight"
            v-model="data.weight"
            type="text"
            label="Вес/Фасовка"
          />
          <AdminUiMoneyInput
            id="price"
            v-model="data.price"
            label="Цена"
          />
          <AdminUiInput
            id="amount"
            v-model="data.amount"
            type="number"
            label="Доступное количество"
          />
        </div>
        <div class="grid grid-rows-2 gap-2">
          <AdminUiTextArea
            id="description"
            v-model="data.description"
            label="Описание"
          />
          <AdminUiTextArea
            id="characteristic"
            v-model="data.characteristic"
            label="Характеристика"
          />
        </div>
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
