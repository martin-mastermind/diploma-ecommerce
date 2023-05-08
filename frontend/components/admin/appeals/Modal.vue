<script setup lang="ts">
import { useAppeals } from '~/store/admin/appeals'

const props = defineProps<{
  isOpened: boolean
  id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])

const appealsStore = useAppeals()
watch(() => props.isOpened, () => {
  if (!props.isOpened) { return }

  if (props.id === 0) { return }
  appealsStore.getAppeal(props.id)
})

const cannotClose = computed(() => appealsStore.currentAppeal?.status as string !== 'in-work')

async function askClose () {
  if (!props.id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await appealsStore.closeAppeal()) { return }

  emit('refetchList')
  emit('update:isOpened', false)
}

</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] h-[90%] bg-slate-100 rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center text-3xl">
        <h2>Просмотр обращения</h2>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <section v-if="appealsStore.currentAppeal" class="flex flex-col gap-2">
        <h2 class="text-2xl">
          Пользователь
        </h2>
        <AdminAppealsUserTable :user="appealsStore.currentAppeal?.user" />
      </section>
      <AdminAppealsMessages />
      <footer class="mt-auto flex w-full justify-end gap-5">
        <button :disabled="cannotClose" class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700" @click="askClose">
          Закрыть обращение
        </button>
      </footer>
    </section>
  </div>
</template>
