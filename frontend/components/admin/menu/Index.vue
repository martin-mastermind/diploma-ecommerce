<script setup lang="ts">
import { useUser } from '~/store/admin/user'

const { user } = useUser()

const isContent = computed(() => user?.type === 'content' || user?.type === 'full')
const isTech = computed(() => user?.type === 'tech' || user?.type === 'full')
</script>

<template>
  <nav class="border-r border-slate-300 flex flex-col">
    <section class="p-5 flex flex-col gap-5">
      <AdminMenuLinkGroup v-if="isContent" title="Каталог">
        <AdminMenuLink to="/admin/goods" icon="material-symbols:view-list-outline-rounded" title="Товары" />
        <AdminMenuLink to="/admin/categories" icon="material-symbols:category-outline-rounded" title="Категории" />
      </AdminMenuLinkGroup>
      <AdminMenuLink v-if="isContent" class="text-xl" to="/admin/orders" icon="material-symbols:chrome-reader-mode-outline-rounded" title="Заказы" />
      <AdminMenuLinkGroup v-if="isContent" title="Спец.предложения">
        <AdminMenuLink to="/admin/promotions" icon="material-symbols:info-outline-rounded" title="Акции" />
        <AdminMenuLink to="/admin/coupons" icon="mingcute:coupon-line" title="Купоны" />
      </AdminMenuLinkGroup>
      <AdminMenuLink v-if="isTech" class="text-xl" to="/admin/appeals" icon="material-symbols:person-outline-rounded" title="Обращения" />
    </section>
    <AdminMenuUser />
  </nav>
</template>

<style lang="scss" scoped>
nav {
  grid-area: nav;
}
</style>
