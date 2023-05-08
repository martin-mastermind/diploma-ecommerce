<script setup lang="ts">
import { useCoupons } from '~/store/admin/coupons'
import { useCategories } from '~/store/admin/categories'

import { useCoupon } from '~/composables/admin/useCoupon'

const props = defineProps<{
    isOpened: boolean
    id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])
const { data, cannotSave, save, clear } = useCoupon()

const categoriesStore = useCategories()
const couponsStore = useCoupons()
watch(() => props.isOpened, () => {
  if (!props.isOpened) { return }
  categoriesStore.getCategories()
  clear()

  if (props.id === 0) { return }
  couponsStore.getCoupon(props.id)
})

async function askDelete () {
  if (!props.id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await couponsStore.deleteCoupon(props.id)) { return }

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
        <h2>Редактирование купона</h2>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5">
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
          <AdminUiInput
            id="code"
            v-model="data.code"
            type="text"
            label="Код"
          />
          <AdminUiInput
            id="use_amount"
            v-model="data.use_amount"
            type="number"
            label="Количество использований"
          />
        </div>
        <AdminCouponsRules v-model:rules="data.rules" />
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
