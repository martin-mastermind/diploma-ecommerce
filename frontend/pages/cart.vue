<script setup lang="ts">
import { useCart } from '~/store/client/cart'

const { getCartItems } = useCart()

onMounted(getCartItems)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ClientHeader />
    <LazyClientCart />
    <ClientMenu />
  </div>
</template>
