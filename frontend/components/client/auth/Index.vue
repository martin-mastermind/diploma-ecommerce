<script setup lang="ts">
import { useAuthModal } from '~/composables/client/useAuthModal'

const { isOpened, modalType } = useAuthModal()
</script>

<template>
  <div v-if="isOpened" class="flex z-20 justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <ClientAuthLogin v-if="modalType === 'login'" />
    <ClientAuthRegister v-else />
  </div>
</template>
