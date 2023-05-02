<script setup lang="ts">
import { useLogin } from '~/composables/admin/useLogin'

const { data, cannotLogin, login } = useLogin()
</script>

<template>
  <main class="bg-slate-300 text-xl flex flex-col justify-center items-center p-5 rounded-xl gap-10 shadow-xl sm:p-10 transition-all">
    <h1 class="font-bold">
      Авторизуйтесь для доступа
    </h1>
    <form class="w-full flex flex-col gap-5">
      <AdminLoginFormElement
        v-for="(element, key) in data"
        :id="key"
        :key="key"
        v-model="element.value"
        :type="element.type"
        :label="element.label"
      />
    </form>
    <button
      :disabled="cannotLogin"
      class="w-full bg-slate-500 text-white p-2 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700"
      @click="login"
    >
      Авторизоваться
    </button>
  </main>
</template>
