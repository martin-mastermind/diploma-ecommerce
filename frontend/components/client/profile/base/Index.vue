<script setup lang="ts">
const userData = ref({
  email: 'martbelmoaw@gmail.com',
  name: 'Мартин',
  phone: '+375257075176',
  password: 'test2023'
})
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Личные данные
    </h1>
    <section class="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-center">
      <ClientProfileBaseField v-model:value="userData.name" label="Имя" placeholder="Иван" type="text" />
      <ClientProfileBaseField v-model:value="userData.email" label="Email" placeholder="test@email.com" type="email" />
      <ClientProfileBaseField v-model:value="userData.phone" label="Номер телефона" placeholder="+375257075176" type="tel" />
      <ClientProfileBaseField v-model:value="userData.password" label="Пароль" placeholder="**********" type="password" />
    </section>
  </article>
</template>
