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
      <NuxtLink :to="`/good/${good.id}`" class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:open-in-new-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
      </NuxtLink>
      <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:delete-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
      </div>
      <div class="p-0.5 flex justify-center items-center lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:favorite-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
      </div>
      <div class="p-0.5 flex justify-center items-center lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:candlestick-chart-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
      </div>
    </div>
  </div>
</template>
