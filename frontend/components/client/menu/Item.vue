<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  link?: string
}>()
</script>

<template>
  <NuxtLink :to="link || '#'" class="rounded-lg p-1 flex flex-col items-center cursor-pointer hover:bg-blue-100 active:bg-blue-200 transition-colors">
    <Icon :name="icon" size="1.5rem" class="text-blue-900 lg:w-7 lg:h-7" />
    <p class="text-blue-900 text-xs md:text-sm lg:text-lg">
      {{ title }}
    </p>
  </NuxtLink>
</template>
