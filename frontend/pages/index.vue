<script setup lang="ts">

</script>

<template>
  <div class="grid-area w-screen min-h-screen grid relative">
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
  }

  /* @media (min-width: 1024px) {
    .grid-area {
      grid-template-areas:
        "header"
        "menu"
        "promotions"
        "catalog";
    }
  } */
</style>
