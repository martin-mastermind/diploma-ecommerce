<script setup lang="ts">
import { useGoods } from '~/store/admin/goods'

const emit = defineEmits(['openModal'])

const goodsStore = useGoods()
onServerPrefetch(goodsStore.getGoods)
</script>

<template>
  <table class="mt-10 text-xl w-full border-collapse border border-slate-500">
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          ID
        </th>
        <th class="p-2">
          Артикул
        </th>
        <th class="p-2">
          Наименование
        </th>
        <th class="p-2 w-1/4" />
      </tr>
    </thead>
    <tbody v-if="goodsStore.goods.length > 0">
      <tr v-for="good in goodsStore.goods" :key="good.id" class="border-b border-slate-500 hover:bg-slate-200 transition-colors">
        <td class="p-2">
          {{ good.id }}
        </td>
        <td class="p-2">
          {{ good.vendor_code }}
        </td>
        <td class="p-2">
          {{ good.title }}
        </td>
        <td class="text-center">
          <button class="cursor-pointer hover:bg-slate-300 rounded-lg active:bg-slate-400 p-2 transition-colors" @click="emit('openModal', good.id)">
            Показать подробности
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
