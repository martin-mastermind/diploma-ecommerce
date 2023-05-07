<script setup lang="ts">
const props = defineProps<{
  id: string,
  label: string,
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const input = ref(null as HTMLInputElement | null)

const previewUrl = ref(props.modelValue || '/img/goods_placeholder.png')

function emitInput () {
  emit('update:modelValue', input.value!.value)
}

function setPreviewUrl () {
  previewUrl.value = input.value!.value
}

function setPlaceholder () {
  previewUrl.value = '/img/goods_placeholder.png'
}
</script>

<template>
  <section class="flex gap-2">
    <img class="w-1/4 aspect-square object-contain" :src="previewUrl" alt="" @error="setPlaceholder">
    <div class="w-3/4 flex flex-col gap-1">
      <label :for="id">{{ label }}</label>
      <input
        :id="id"
        ref="input"
        :value="modelValue"
        class="bg-slate-100 p-2 text-slate-500 border-2 border-slate-500 rounded-md outline-none"
        type="text"
        @input="emitInput"
        @blur="setPreviewUrl"
      >
    </div>
  </section>
</template>
