<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth'
})
</script>

<template>
  <div class="admin-page w-screen h-screen grid bg-slate-100 grid-cols-5">
    <AdminMenu />
    <AdminBase />
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
  grid-template-areas: 'nav content content content content';
}
</style>
