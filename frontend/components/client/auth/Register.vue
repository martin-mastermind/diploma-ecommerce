<script setup lang="ts">
const registrationData = ref({
  email: null,
  name: null,
  phone: null,
  password: null
})

const emit = defineEmits(['switchAuth'])

</script>

<template>
  <section class="bg-white rounded-sm p-5 overflow-auto flex flex-col gap-5">
    <header class="flex justify-between items-center">
      <h2 class="text-3xl font-bold">
        Регистрация
      </h2>
      <ClientUiIconButton name="material-symbols:close-rounded" />
    </header>
    <article class="flex flex-col gap-5">
      <label class="flex flex-col gap-1">
        Имя
        <input
          v-model="registrationData.name"
          class="rounded-md outline-none border border-blue-950 p-2"
          placeholder="Иван"
          type="text"
        >
      </label>
      <label class="flex flex-col gap-1">
        Email
        <input
          v-model="registrationData.email"
          class="rounded-md outline-none border border-blue-950 p-2"
          placeholder="test@email.com"
          type="email"
        >
      </label>
      <label class="flex flex-col gap-1">
        Номер телефона
        <input
          v-model="registrationData.phone"
          class="rounded-md outline-none border border-blue-950 p-2"
          placeholder="+375257075176"
          type="tel"
        >
      </label>
      <label class="flex flex-col gap-1">
        Пароль
        <input
          v-model="registrationData.password"
          class="rounded-md outline-none border border-blue-950 p-2"
          placeholder="**********"
          type="password"
        >
      </label>
    </article>
    <footer class="mt-auto flex flex-col md:flex-row w-full justify-end gap-5">
      <button class="bg-blue-700 text-white px-5 py-3 rounded-md transition-colors disabled:bg-blue-400 hover:bg-blue-800 active:bg-blue-900">
        Зарегистрироваться
      </button>
      <button class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700" @click="emit('switchAuth')">
        Авторизоваться
      </button>
    </footer>
  </section>
</template>
