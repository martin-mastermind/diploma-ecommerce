<script setup lang="ts">
async function goHome () {
  await navigateTo('/')
}
</script>

<template>
  <header>
    <ClientHeaderLogo @click="goHome" />
    <section class="flex gap-5 items-center justify-center">
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
