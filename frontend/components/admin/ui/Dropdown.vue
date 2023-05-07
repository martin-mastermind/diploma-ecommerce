<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: number | string | null
  options: {key: any, name: string, value: any}[]
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
    <select
      :id="id"
      ref="input"
      :value="modelValue"
      class="bg-slate-100 p-2 text-slate-500 border-2 border-slate-500 rounded-md outline-none"
      :disabled="options.length === 0"
      @input="emitInput"
    >
      <option v-for="option in options" :key="option.key" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </section>
</template>
