<script setup lang="ts">
definePageMeta({
  auth: true,
  role: 'content',
  middleware: 'admin-auth'
})
</script>

<template>
  <div class="admin-page w-screen h-screen grid bg-slate-100 grid-cols-5">
    <AdminMenu />
    <AdminCategories />
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
  grid-template-areas: 'nav content content content content';
}
</style>
