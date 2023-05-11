<script setup lang="ts">

</script>

<template>
  <div class="grid-area min-h-screen grid relative">
    <ClientHeader />
    <ClientComparison />
    <ClientMenu />
  </div>
</template>

<style lang="scss" scoped>
  .grid-area {
    grid-template-areas:
      "header"
      "comparison"
      "menu";

    grid-template-rows: auto 1fr auto;
  }
</style>
