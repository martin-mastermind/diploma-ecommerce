<script setup lang="ts">
import { useEvent } from '~/composables/utils/useEventBus'

const payTypes = ref([
  {
    type: 'cash',
    title: 'Наличными'
  },
  {
    type: 'card',
    title: 'Картой'
  }
])

const selectedPayType = ref<'cash' | 'card' | null>(null)
watch(selectedPayType, () => {
  if (!selectedPayType.value) { return }
  useEvent('cart:update', {
    payType: selectedPayType.value
  })
})
</script>

<template>
  <section class="flex flex-col gap-2">
    <h3 class="text-xl lg:text-2xl font-bold">
      Метод оплаты
    </h3>
    <select v-model="selectedPayType" class="p-2 rounded-lg border border-blue-950">
      <option v-for="payType in payTypes" :key="payType.type" :value="payType.type">
        {{ payType.title }}
      </option>
    </select>
  </section>
</template>
