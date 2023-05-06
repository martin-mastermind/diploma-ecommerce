<script setup lang="ts">
import { useUser } from '~/store/admin/user'

const { user, logoutUser } = useUser()

const userName = computed(() => `${user?.last_name} ${user?.first_name} ${user?.patronymic || ''}`)

async function logout () {
  if (!await logoutUser()) { return }
  location.reload()
}
</script>

<template>
  <section class="p-5 mt-auto border-t border-slate-300 flex items-center">
    <h2 class="text-xl font-bold">
      {{ userName }}
    </h2>
    <button class="ml-auto p-2 w-10 h-10 flex items-center justify-center bg-slate-300 rounded-full border border-slate-300 hover:bg-slate-400 active:bg-slate-500 transition-colors" @click="logout">
      <Icon name="material-symbols:logout-rounded" size="22px" />
    </button>
  </section>
</template>
