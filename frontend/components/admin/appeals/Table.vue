<script setup lang="ts">
import { useAppeals } from '~/store/admin/appeals'

const emit = defineEmits(['openModal'])

const appealsStore = useAppeals()
</script>

<template>
  <table class="mt-10 overflow-auto text-xl w-full border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          ID
        </th>
        <th class="p-2">
          Имя пользователя
        </th>
        <th class="p-2 w-1/4" />
      </tr>
    </thead>
    <tbody v-if="appealsStore.appeals.length > 0">
      <tr v-for="appeal in appealsStore.appeals" :key="appeal.id" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ appeal.id }}
        </td>
        <td class="p-2">
          {{ appeal.user.name }}
        </td>
        <td class="text-center">
          <button class="cursor-pointer hover:bg-slate-300 rounded-lg active:bg-slate-400 p-2 transition-colors" @click="emit('openModal', appeal.id)">
            Показать сообщения
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
