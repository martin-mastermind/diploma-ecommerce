<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
}>()
</script>

<template>
  <nuxt-link active-class="bg-slate-200" :to="to" class="flex items-center gap-2 cursor-pointer p-3 hover:bg-slate-200 rounded-lg active:bg-slate-300 transition-colors">
    <Icon size="22px" :name="icon" /> {{ title }}
  </nuxt-link>
</template>
