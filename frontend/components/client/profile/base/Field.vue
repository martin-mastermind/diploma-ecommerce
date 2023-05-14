<script setup lang="ts">
defineProps<{
    label: string
    value: string
    type: string
    placeholder: string
}>()

const emit = defineEmits(['update:value'])

const inputRef = ref<HTMLInputElement | null>()
const isDisabled = ref(true)

function toggleField () {
  if (!isDisabled.value) { emit('update:value', inputRef.value?.value) }
  isDisabled.value = !isDisabled.value
}

const icon = computed(() => isDisabled.value ? 'material-symbols:edit-rounded' : 'material-symbols:save-outline-rounded')
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
        :disabled="isDisabled"
      >
      <ClientUiIconButton :name="icon" @click="toggleField" />
    </div>
  </div>
</template>
