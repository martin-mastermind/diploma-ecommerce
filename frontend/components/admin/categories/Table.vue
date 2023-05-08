<script setup lang="ts">
import { useCategories } from '~/store/admin/categories'

const emit = defineEmits(['openModal'])

const categoriesStore = useCategories()
</script>

<template>
  <table class="mt-10 text-xl w-full border-collapse border border-slate-500">
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
    <tbody v-if="categoriesStore.categories.length > 0">
      <tr v-for="category in categoriesStore.categories" :key="category.id" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ category.id }}
        </td>
        <td class="p-2">
          {{ category.title }}
        </td>
        <td class="text-center">
          <button class="cursor-pointer hover:bg-slate-300 rounded-lg active:bg-slate-400 p-2 transition-colors" @click="emit('openModal', category.id)">
            Показать подробности
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
