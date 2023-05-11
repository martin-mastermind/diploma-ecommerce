<script setup lang="ts">

</script>

<template>
  <div class="grid-area min-h-screen grid relative">
    <ClientHeader />
    <ClientBasePromotions />
    <ClientBaseCatalog />
    <ClientMenu />
  </div>
</template>

<style lang="scss" scoped>
  .grid-area {
    grid-template-areas:
      "header"
      "promotions"
      "catalog"
      "menu";

      grid-template-rows: auto auto 1fr auto;
  }
</style>
