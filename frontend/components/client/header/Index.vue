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
      <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:view-module-rounded" size="1.5rem" class="text-blue-900 lg:w-7 lg:h-7" />
      </div>
    </section>
  </header>
</template>

<style lang="scss" scoped>
  header {
    grid-area: header;
  }
</style>
