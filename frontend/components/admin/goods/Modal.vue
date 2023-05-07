<script setup lang="ts">
import { useGoods } from '~/store/admin/goods'

const props = defineProps<{
    isOpened: boolean
    id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])
const goodsStore = useGoods()

const title = ref('')

function askDelete () {
  if (!props.id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!goodsStore.deleteGood(props.id)) { return }

  emit('refetchList')
  emit('update:isOpened', false)
}
</script>

<template>
  <div :data-active="isOpened" class=" opacity-0 -z-10 data-[active=true]:opacity-100 data-[active=true]:z-10 flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] h-[90%] bg-slate-100 rounded-sm p-5 overflow-auto">
      <header class="flex justify-between items-center text-3xl">
        <div class="flex gap-2 items-center">
          <h2>Редактирование товара</h2>
          <Icon v-if="id" class="cursor-pointer hover:text-red-600 active:text-red-700 transition-colors" name="material-symbols:delete-outline-rounded" @click="askDelete" />
        </div>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="mt-5 flex flex-col gap-5">
        <AdminUiImageInput
          id="title"
          v-model="title"
          type="text"
          label="Изображение"
        />
        <div class="grid grid-cols-2 gap-2">
          <AdminUiInput
            id="title"
            v-model="title"
            type="text"
            label="Наименование"
          />
          <AdminUiInput
            id="title"
            v-model="title"
            type="text"
            label="Артикул"
          />
          <AdminUiInput
            id="title"
            v-model="title"
            type="text"
            label="Страна производства"
          />
          <AdminUiInput
            id="title"
            v-model="title"
            type="text"
            label="Вес/Фасовка"
          />
          <AdminUiInput
            id="title"
            v-model="title"
            type="text"
            label="Цена"
          />
          <AdminUiInput
            id="title"
            v-model="title"
            type="text"
            label="Доступное количество"
          />
        </div>
        <div class="grid grid-rows-2 gap-2">
          <AdminUiTextArea
            id="title"
            v-model="title"
            label="Описание"
          />
          <AdminUiTextArea
            id="title"
            v-model="title"
            label="Характеристика"
          />
        </div>
      </article>
    </section>
  </div>
</template>
