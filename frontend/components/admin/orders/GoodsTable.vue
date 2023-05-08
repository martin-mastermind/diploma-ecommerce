<script setup lang="ts">
defineProps<{
  goods: OrderGood[]
}>()
</script>

<template>
  <table class="text-xl w-full border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          Наименование
        </th>
        <th class="p-2">
          Категория
        </th>
        <th class="p-2">
          Артикул
        </th>
        <th class="p-2">
          Цена
        </th>
        <th class="p-2">
          Количество
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="good in goods" :key="good.vendor_code" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ good.title }}
        </td>
        <td class="p-2">
          {{ good.category }}
        </td>
        <td class="p-2">
          {{ good.vendor_code }}
        </td>
        <td class="p-2">
          {{ good.price }}
        </td>
        <td class="p-2">
          {{ good.amount }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
