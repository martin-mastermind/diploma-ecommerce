<script setup lang="ts">
</script>

<template>
  <article class="p-2 flex flex-col gap-1">
    <h1 class="text-xl font-bold">
      Акции
    </h1>
    <ClientBasePromotionsCarousel />
  </article>
</template>

<style lang="scss" scoped>
  article {
    grid-area: promotions;
  }
</style>
