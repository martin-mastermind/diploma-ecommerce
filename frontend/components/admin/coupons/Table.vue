<script setup lang="ts">
import { useCoupons } from '~/store/admin/coupons'

const emit = defineEmits(['openModal'])

const couponsStore = useCoupons()
</script>

<template>
  <table class="mt-10 overflow-auto text-xl w-full border-collapse border border-slate-500">
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
    <tbody v-if="couponsStore.coupons.length > 0">
      <tr v-for="coupon in couponsStore.coupons" :key="coupon.id" class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none">
        <td class="p-2">
          {{ coupon.id }}
        </td>
        <td class="p-2">
          {{ coupon.title }}
        </td>
        <td class="text-center">
          <button class="cursor-pointer hover:bg-slate-300 rounded-lg active:bg-slate-400 p-2 transition-colors" @click="emit('openModal', coupon.id)">
            Показать подробности
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
