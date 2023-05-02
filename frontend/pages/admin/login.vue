<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth'
})
</script>

<template>
  <AdminLogin />
</template>

<style lang="scss">
body {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f1f5f9; // bg-slate-100
}
</style>
