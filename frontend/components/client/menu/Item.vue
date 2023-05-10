<script setup lang="ts">
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <section class="flex flex-col items-center">
    <Icon :name="icon" size="1.5rem" class="text-blue-900" />
    <p class="text-blue-900 text-[0.6rem]">
      {{ title }}
    </p>
  </section>
</template>
