<script setup lang="ts">
</script>

<template>
  <main class="bg-slate-300 text-xl flex flex-col justify-center items-center p-5 rounded-xl gap-10 shadow-xl sm:p-10 transition-all">
    <h1 class="font-bold">
      Авторизуйтесь для доступа
    </h1>
    <form class="w-full flex flex-col gap-5">
      <section class="flex flex-col gap-1">
        <label for="email">Email</label>
        <input id="email" class="bg-slate-100 p-2 text-slate-500 border-2 border-slate-500 rounded-md outline-none" type="email">
      </section>
      <section class="flex flex-col gap-1">
        <label for="password">Пароль</label>
        <input id="password" class="bg-slate-100 p-2 text-slate-500 border-2 border-slate-500 rounded-md outline-none" type="password">
      </section>
    </form>
    <button class="w-full bg-slate-500 text-white p-2 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600">
      Авторизоваться
    </button>
  </main>
</template>

<style lang="scss">
body {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #f1f5f9; // bg-slate-100
}
</style>
