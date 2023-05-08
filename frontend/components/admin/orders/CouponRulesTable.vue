<script setup lang="ts">
defineProps<{
  rules: OrderRule[]
}>()
</script>

<template>
  <table class="text-xl w-full border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          Категория
        </th>
        <th class="p-2">
          Скидка (в %)
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rule in rules" :key="rule.category" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ rule.category }}
        </td>
        <td class="p-2">
          {{ rule.discount }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
