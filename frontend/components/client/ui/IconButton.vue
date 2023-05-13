<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
    <Icon :name="name" size="1.5rem" class="lg:w-7 lg:h-7" />
  </div>
</template>
