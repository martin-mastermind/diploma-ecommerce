<script setup lang="ts">
import { useDelivery } from '~/composables/client/useDelivery'

defineProps<{
  isOpened: boolean
}>()

const { data, cannotSave, save } = useDelivery()

const emit = defineEmits(['update:isOpened'])

async function saveChanges () {
  if (!await save()) { return }

  emit('update:isOpened', false)
}
</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] bg-white rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center">
        <h2 class="text-lg font-bold md:text-2xl">
          Редактирование адреса
        </h2>
        <ClientUiIconButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5 lg:flex-row lg:flex-wrap">
        <ClientUiInput v-model:value="data.city" label="Город" type="text" placeholder="Минск" />
        <ClientUiInput v-model:value="data.street" label="Улица" type="text" placeholder="Пулихова" />
        <ClientUiInput v-model:value="data.house" label="Дом" type="number" placeholder="5" />
        <ClientUiInput v-model:value="data.entrance" label="Подъезд" type="number" placeholder="2" />
        <ClientUiInput v-model:value="data.floor" label="Этаж" type="number" placeholder="7" />
        <ClientUiInput v-model:value="data.apartment" label="Квартира" type="number" placeholder="45" />
        <label class="w-full flex flex-col gap-1">
          Комментарий к адресу
          <textarea v-model="data.commentary" class="max-w-xl lg:max-w-full border border-blue-900 p-2 rounded-lg resize-none overflow-auto" cols="30" rows="10" />
        </label>
      </article>
      <footer class="mt-auto flex w-full justify-end gap-5">
        <button class="bg-blue-700 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-blue-800 active:bg-blue-900" :disabled="cannotSave" @click="saveChanges">
          Сохранить
        </button>
      </footer>
    </section>
  </div>
</template>
