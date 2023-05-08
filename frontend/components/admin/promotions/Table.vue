<script setup lang="ts">
import { usePromotions } from '~/store/admin/promotions'

const emit = defineEmits(['openModal'])

const promotionsStore = usePromotions()
</script>

<template>
  <table class="mt-10 text-xl overflow-auto w-full border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          ID
        </th>
        <th class="p-2">
          Наименование
        </th>
        <th class="p-2 w-1/4" />
      </tr>
    </thead>
    <tbody v-if="promotionsStore.promotions.length > 0">
      <tr v-for="promotion in promotionsStore.promotions" :key="promotion.id" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ promotion.id }}
        </td>
        <td class="p-2">
          {{ promotion.title }}
        </td>
        <td class="text-center">
          <button class="cursor-pointer hover:bg-slate-300 rounded-lg active:bg-slate-400 p-2 transition-colors" @click="emit('openModal', promotion.id)">
            Показать подробности
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
