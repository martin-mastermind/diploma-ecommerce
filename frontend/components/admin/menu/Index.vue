<script setup lang="ts" />

<template>
  <nav class="border-r border-slate-300 flex flex-col">
    <section class="p-5 flex flex-col gap-5">
      <AdminMenuLinkGroup title="Каталог">
        <AdminMenuLink to="" icon="material-symbols:view-list-outline-rounded" title="Товары" />
        <AdminMenuLink to="" icon="material-symbols:category-outline-rounded" title="Категории" />
      </AdminMenuLinkGroup>
      <AdminMenuLink class="text-xl" to="" icon="material-symbols:chrome-reader-mode-outline-rounded" title="Заказы" />
      <AdminMenuLinkGroup title="Спец.предложения">
        <AdminMenuLink to="" icon="material-symbols:info-outline-rounded" title="Акции" />
        <AdminMenuLink to="" icon="mingcute:coupon-line" title="Купоны" />
      </AdminMenuLinkGroup>
      <AdminMenuLink class="text-xl" to="" icon="material-symbols:person-outline-rounded" title="Обращения" />
    </section>
    <AdminMenuUser />
  </nav>
</template>

<style lang="scss" scoped>
nav {
  grid-area: nav;
}
</style>
