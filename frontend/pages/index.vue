<script setup lang="ts">

</script>

<template>
  <div class="grid-area w-screen h-screen grid">
    <ClientHeader />
    <ClientPromotions />
    <ClientCatalog />
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

    grid-template-rows: auto 1fr 1fr auto;
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
