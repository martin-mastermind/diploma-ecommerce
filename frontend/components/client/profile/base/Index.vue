<script setup lang="ts">
import { useProfile } from '~/composables/client/useProfile'

const { data } = useProfile()
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      Личные данные
    </h1>
    <section class="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-center">
      <ClientProfileBaseField v-model:value="data.name" label="Имя" placeholder="Иван" type="text" />
      <ClientProfileBaseField v-model:value="data.email" label="Email" placeholder="test@email.com" type="email" />
      <ClientProfileBaseField v-model:value="data.phone" label="Номер телефона" placeholder="375257075176" type="tel" />
      <ClientProfileBaseField v-model:value="data.password" label="Пароль" placeholder="**********" type="password" />
    </section>
  </article>
</template>
