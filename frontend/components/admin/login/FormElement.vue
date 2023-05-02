<script setup lang="ts">
defineProps<{
  id: string,
  label: string,
  type: string,
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const input = ref(null as HTMLInputElement | null)

function emitInput () {
  emit('update:modelValue', input.value!.value)
}
</script>

<template>
  <section class="grid gap-1">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      ref="input"
      :value="modelValue"
      class="bg-slate-100 p-2 text-slate-500 border-2 border-slate-500 rounded-md outline-none"
      :type="type"
      @input="emitInput"
    >
  </section>
</template>
