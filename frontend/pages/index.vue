<script setup lang="ts">

</script>

<template>
  <div class="grid-area w-screen h-screen grid">
    <ClientHeader />
    <ClientPromotions />
    <ClientCatalog />
    <ClientMenu />
    <!--
        Мобильная версия
        header -> логотип, поиск, каталог
        section -> акции
        section -> мини-каталог
        section -> меню пользователя ( главная, корзина, избранное, список сравнения, профиль)
    -->
    <!--
        ПК версия
        header -> логотип, поиск, каталог
        section -> меню пользователя ( главная, корзина, избранное, список сравнения, профиль)
        section -> акции
        section -> мини-каталог
    -->
  </div>
</template>

<style lang="scss" scoped>
  .grid-area {
    grid-template-areas:
      "header"
      "promotions"
      "catalog"
      "menu";

    grid-template-rows: auto 1fr 1fr auto;
  }

  /* @media (min-width: 1024px) {
    .grid-area {
      grid-template-areas:
        "header"
        "menu"
        "promotions"
        "catalog";
    }
  } */
</style>
