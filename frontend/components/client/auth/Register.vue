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
      <ClientUiInput v-model:value="registrationData.name" label="Имя" placeholder="Иван" type="text" />
      <ClientUiInput v-model:value="registrationData.email" label="Email" placeholder="test@email.com" type="email" />
      <ClientUiInput v-model:value="registrationData.phone" label="Номер телефона" placeholder="+375257075176" type="tel" />
      <ClientUiInput v-model:value="registrationData.password" label="Пароль" placeholder="**********" type="password" />
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
