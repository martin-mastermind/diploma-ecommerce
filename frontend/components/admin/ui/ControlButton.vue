<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <Icon :name="name" class="cursor-pointer rounded-full border border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white active:bg-slate-800 transition-colors" />
</template>
