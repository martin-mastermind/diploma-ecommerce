<script setup lang="ts">
import { useAppeals } from '~/store/client/appeals'

const appealsStore = useAppeals()

const appealStatus = computed(() => (status: 'new' | 'in-work' | 'closed') => {
  const statuses = {
    new: 'Новый',
    'in-work': 'В работе',
    closed: 'Закрыт'
  }

  return statuses[status]
})

const isOpened = ref(false)

async function toggleModal (id?: number) {
  await appealsStore.getAppeal(id)

  isOpened.value = true
}

async function askClose (id?: number) {
  if (!id) { return }

  if (!confirm('Вы уверены?')) { return }

  if (!await appealsStore.closeAppeal(id)) { return }

  await appealsStore.getAppeals()
}
</script>

<template>
  <article class="p-2 flex flex-col gap-1 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Обращения в тех.поддержку
    </h1>
    <section class="flex flex-col gap-2 justify-center lg:gap-10">
      <div v-for="appeal in appealsStore.appeals" :key="appeal.id" class="p-5 border-b border-blue-950 flex items-center justify-between">
        <div class="flex gap-2 flex-col md:gap-4">
          <span class="text-lg md:text-xl font-bold">Обращение №{{ appeal.id }}</span>
          <span class="text-sm md:text-lg">Сотрудник: <span v-if="appeal.admin" class="font-bold">{{ appeal.admin.name }}</span></span>
          <span class="text-lg md:text-xl font-bold">{{ appealStatus(appeal.status) }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <ClientUiIconButton name="material-symbols:open-in-new-rounded" @click="toggleModal(appeal.id)" />
          <ClientUiIconButton v-if="appeal.status !== 'closed'" name="material-symbols:close-rounded" @click="askClose(appeal.id)" />
        </div>
      </div>
    </section>
    <button class="w-full p-2 fixed left-0 bottom-0 text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 outline-none transition-all" @click="toggleModal()">
      Новое обращение
    </button>

    <ClientProfileAppealsModal v-model:is-opened="isOpened" />
  </article>
</template>
