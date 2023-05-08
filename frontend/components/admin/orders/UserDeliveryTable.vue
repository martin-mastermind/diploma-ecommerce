<script setup lang="ts">
defineProps<{
  userDelivery: OrderUserDelivery
}>()
</script>

<template>
  <table class="text-xl w-full max-h-96 overflow-auto border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          Город
        </th>
        <th class="p-2">
          Улица
        </th>
        <th class="p-2">
          Дом
        </th>
        <th class="p-2">
          Подъезд
        </th>
        <th class="p-2">
          Этаж
        </th>
        <th class="p-2">
          Квартира
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ userDelivery.city }}
        </td>
        <td class="p-2">
          {{ userDelivery.street }}
        </td>
        <td class="p-2">
          {{ userDelivery.house }}
        </td>
        <td class="p-2">
          {{ userDelivery.entrance }}
        </td>
        <td class="p-2">
          {{ userDelivery.floor }}
        </td>
        <td class="p-2">
          {{ userDelivery.apartment }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
