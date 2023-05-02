<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth'
})
</script>

<template>
  <div class="w-screen h-screen grid place-items-center bg-slate-100">
    <AdminLogin />
  </div>
</template>
