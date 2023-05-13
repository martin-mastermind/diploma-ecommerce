<script setup lang="ts">
const isOpened = ref(true)

const authData = ref({
  email: null,
  password: null
})

</script>

<template>
  <div v-if="isOpened" class="flex z-20 justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="bg-white rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center">
        <h2 class="text-3xl font-bold">
          Авторизация
        </h2>
        <ClientUiIconButton name="material-symbols:close-rounded" />
      </header>
      <article class="flex flex-col gap-5">
        <label class="flex flex-col gap-1">
          Email
          <input
            v-model="authData.email"
            class="rounded-md outline-none border border-blue-950 p-2"
            placeholder="test@email.com"
            type="email"
          >
        </label>
        <label class="flex flex-col gap-1">
          Пароль
          <input
            v-model="authData.password"
            class="rounded-md outline-none border border-blue-950 p-2"
            placeholder="**********"
            type="password"
          >
        </label>
      </article>
      <footer class="mt-auto flex flex-col md:flex-row w-full justify-end gap-5">
        <button class="bg-blue-700 text-white px-5 py-3 rounded-md transition-colors disabled:bg-blue-400 hover:bg-blue-800 active:bg-blue-900">
          Авторизоваться
        </button>
        <button class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700">
          Зарегистрироваться
        </button>
      </footer>
    </section>
  </div>
</template>
