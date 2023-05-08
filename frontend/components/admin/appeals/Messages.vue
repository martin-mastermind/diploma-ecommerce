<script setup lang="ts">
import { useAppeals } from '~/store/admin/appeals'
import { useAppeal } from '~/composables/admin/useAppeal'

const appealsStore = useAppeals()

const { data, cannotSave, save } = useAppeal()

</script>

<template>
  <article class="h-full flex flex-col gap-5">
    <section v-if="appealsStore.currentAppeal" class="border border-slate-500 select-none rounded-md p-2 h-[90%] overflow-auto flex flex-col gap-5">
      <div v-for="(message, i) in appealsStore.currentAppeal.messages" :key="i" class="flex flex-col border-b pb-2 border-slate-500 last:border-b-0">
        <div class="flex gap-2 items-center">
          <h3 :data-own="message.from_admin" class="text-xl data-[own=true]:font-bold">
            {{ message.from_admin ? 'Вы' : appealsStore.currentAppeal.user.name }}
          </h3>
          <p class="text-sm">
            {{ message.sent_time }}
          </p>
        </div>
        <div class="text-lg">
          {{ message.message }}
        </div>
      </div>
    </section>
    <div class="flex gap-5 items-end">
      <AdminUiInput
        id="message"
        v-model="data.message"
        class="w-5/6"
        type="text"
        label="Сообщение"
      />
      <button :disabled="cannotSave" class="w-1/6 bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700" @click="save">
        Отправить
      </button>
    </div>
  </article>
</template>
