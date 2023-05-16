<script setup lang="ts">
import { useAppeal } from '~/composables/client/useAppeal'
import { useAppeals } from '~/store/client/appeals'

const appealsStore = useAppeals()
const { data, cannotSave, save } = useAppeal()

defineProps<{
  isOpened: boolean
}>()

const emit = defineEmits(['update:isOpened'])
</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] bg-white rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center">
        <h2 class="text-lg font-bold md:text-2xl">
          Обращение
        </h2>
        <ClientUiIconButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5 lg:gap-10 max-h-96 overflow-auto">
        <div v-for="(message, i) in appealsStore.currentAppeal?.messages" :key="i" class="flex flex-col border-b pb-2 border-slate-500 last:border-b-0">
          <div class="flex gap-2 items-center">
            <h3 :data-own="!message.from_admin" class="text-xl data-[own=true]:font-bold">
              {{ message.from_admin ? appealsStore.currentAppeal?.admin?.name : 'Вы' }}
            </h3>
            <p class="text-sm">
              {{ message.sent_time }}
            </p>
          </div>
          <div class="text-lg">
            {{ message.message }}
          </div>
        </div>
      </article>
      <footer class="mt-auto flex flex-col md:flex-row w-full justify-center gap-5">
        <ClientUiInput v-model:value="data.text" label="Сообщение" type="text" placeholder="Сообщение о проблеме" />
        <button :disabled="cannotSave" class="bg-blue-700 text-white px-5 py-3 rounded-md self-end transition-colors disabled:bg-slate-400 hover:bg-blue-800 active:bg-blue-900" @click="save">
          Отправить
        </button>
      </footer>
    </section>
  </div>
</template>
