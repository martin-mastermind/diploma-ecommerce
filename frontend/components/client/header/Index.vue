<script setup lang="ts">
async function goHome () {
  await navigateTo('/')
}
</script>

<template>
  <header class="top-0 bg-white sticky z-10 pb-5 flex flex-col items-center gap-2 md:flex-row md:px-2 md:gap-5">
    <ClientHeaderLogo @click="goHome" />
    <section class="w-full flex gap-5 items-center justify-center md:justify-normal">
      <ClientHeaderSearch />
      <Icon name="material-symbols:view-module-rounded" class="text-blue-900" size="1.5rem" />
    </section>
  </header>
</template>

<style lang="scss" scoped>
  header {
    grid-area: header;
  }
</style>
