<script setup lang="ts">
defineProps<{
  label: string
  value: string | number | null
  type: string
  placeholder: string
}>()

const emit = defineEmits(['update:value'])

const inputRef = ref<HTMLInputElement | null>()
</script>

<template>
  <div class="w-full lg:w-5/12 flex flex-col gap-2 lg:text-lg">
    <label>{{ label }}</label>
    <div class="flex items-center gap-2">
      <input
        ref="inputRef"
        :value="value"
        class=" w-full rounded-md outline-none border border-blue-950 p-2"
        :placeholder="placeholder"
        :type="type"
        @blur="emit('update:value', inputRef!.value)"
      >
    </div>
  </div>
</template>
