<script setup lang="ts">
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <section class="flex flex-col items-center">
    <Icon :name="icon" size="1.5rem" class="text-blue-900 lg:w-7 lg:h-7" />
    <p class="text-blue-900 text-xs md:text-sm lg:text-lg">
      {{ title }}
    </p>
  </section>
</template>
