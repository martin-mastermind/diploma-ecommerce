<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const input = ref(null as HTMLTextAreaElement | null)

function emitInput () {
  emit('update:modelValue', input.value!.value)
}
</script>

<template>
  <section class="grid gap-1">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      ref="input"
      :value="modelValue"
      class="bg-slate-100 p-2 text-slate-500 border-2 border-slate-500 rounded-md outline-none"
      rows="10"
      :disabled="disabled"
      @input="emitInput"
    />
  </section>
</template>
