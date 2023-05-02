<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth'
})
</script>

<template>
  <div class="page">
    <AdminLogin />
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;

  display: grid;
  place-items: center;

  background-color: #f1f5f9; // bg-slate-100
}
</style>
