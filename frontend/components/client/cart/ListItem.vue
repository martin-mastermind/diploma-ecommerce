<script setup lang="ts">
defineProps<{
  good: {id: number, title: string, price: number, img: string, amount: number}
}>()

const emit = defineEmits(['changeAmount'])

const inputRef = ref<HTMLInputElement | null>(null)

function updateAmount () {
  emit('changeAmount', inputRef.value!.value)
}

</script>
<template>
  <div class="flex flex-col gap-3 items-center">
    <div>
      <img class=" aspect-square object-contain max-h-20" :src="good.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
    </div>
    <span class="overflow-hidden max-w-[4rem] max-h-8 text-lg text-ellipsis">{{ good.title }}</span>
    <span class="font-bold">{{ good.price }} р.</span>
    <label class="flex items-center gap-1">
      <input
        ref="inputRef"
        :value="good.amount"
        class="rounded-md outline-none border border-blue-950 p-2"
        placeholder="1"
        type="number"
        min="0"
        max="10"
        step="1"
        @blur="updateAmount"
      >шт.
    </label>
    <div class="flex gap-2">
      <NuxtLink :to="`/good/${good.id}`">
        <ClientUiIconButton name="material-symbols:open-in-new-rounded" />
      </NuxtLink>
      <ClientUiIconButton name="material-symbols:delete-outline-rounded" />
      <ClientUiIconButton name="material-symbols:favorite-outline-rounded" />
      <ClientUiIconButton name="material-symbols:candlestick-chart-outline-rounded" />
    </div>
  </div>
</template>
