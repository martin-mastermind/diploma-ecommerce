<script setup lang="ts">
import { useOrder } from '~/composables/client/useOrder'
import { useCart } from '~/store/client/cart'

function goBack () {
  useRouter().go(-1)
}

const cartStore = useCart()
const { cannotOrder, order } = useOrder()

</script>

<template>
  <article class="w-full flex flex-col gap-5">
    <header class="px-2 lg:px-10 flex gap-2 items-center mb-5 cursor-pointer w-fit" @click="goBack">
      <Icon name="material-symbols:arrow-back-ios-new-rounded" size="1.25rem" />
      <h1 class="text-2xl lg:text-3xl font-bold">
        Корзина
        <span v-if="cartStore.cartItems.length > 0">{{ cartStore.totalCartPrice }} р.</span>
      </h1>
    </header>
    <section v-if="cartStore.cartItems.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 max-h-96 overflow-auto">
      <ClientCartListItem v-for="good in cartStore.cartItems" :key="good.id" :good="good" />
    </section>
    <section v-else class="p-5">
      <h2 class="text-xl lg:text-2xl">
        Ваша корзина пуста...
      </h2>
    </section>
    <section v-if="cartStore.cartItems.length > 0" class="p-2 flex flex-col gap-3 lg:px-10">
      <h2 class="text-2xl lg:text-3xl font-bold">
        Оформление заказа
      </h2>
      <ClientCartDeliveries />
      <ClientCartPayTypes />
      <ClientCartDates />
      <ClientCartCoupon />
      <button :disabled="cannotOrder" class="p-3 bg-blue-700 rounded-lg disabled:bg-blue-400 hover:bg-blue-800 active:bg-blue-900 text-white" @click="order">
        Оформить заказ
      </button>
    </section>
  </article>
</template>
