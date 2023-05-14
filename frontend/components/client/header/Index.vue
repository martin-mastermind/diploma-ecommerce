<script setup lang="ts"></script>

<template>
  <header class="w-full top-0 bg-white sticky z-10 pb-5 flex flex-col items-center gap-2 md:flex-row md:px-2 md:gap-5">
    <ClientUiLogo />
    <section class="w-full flex gap-5 items-center justify-center md:justify-normal">
      <ClientHeaderSearch />
      <NuxtLink to="/catalog" class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:grid-view-outline-rounded" size="1.5rem" class="text-blue-900 lg:w-7 lg:h-7" />
      </NuxtLink>
    </section>
  </header>
</template>
