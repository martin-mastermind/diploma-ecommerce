<script setup lang="ts">

</script>

<template>
  <div class="grid-area min-h-screen grid relative">
    <ClientHeader />
    <ClientFavourites />
    <ClientMenu />
  </div>
</template>

<style lang="scss" scoped>
  .grid-area {
    grid-template-areas:
      "header"
      "favourites"
      "menu";

    grid-template-rows: auto 1fr auto;
  }
</style>
