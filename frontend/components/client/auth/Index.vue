<script setup lang="ts">
import { useAuthModal } from '~/composables/client/useAuthModal'

const { isOpened } = useAuthModal()

const isLoginActive = ref(true)

</script>

<template>
  <div v-if="isOpened" class="flex z-20 justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <ClientAuthLogin v-if="isLoginActive" @switch-auth="isLoginActive = !isLoginActive" />
    <ClientAuthRegister v-else @switch-auth="isLoginActive = !isLoginActive" />
  </div>
</template>
