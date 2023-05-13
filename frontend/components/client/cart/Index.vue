<script setup lang="ts">
function goBack () {
  useRouter().go(-1)
}

const cart = ref([
  {
    id: 1,
    title: 'Банан',
    img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
    price: 2.5,
    amount: 1
  },
  {
    id: 2,
    title: 'Яблоко',
    img: '',
    price: 1.89,
    amount: 2
  }
])

const totalPrice = computed(() => {
  let result = 0
  for (const good of cart.value) {
    result += good.price * good.amount
  }
  return result.toFixed(2)
})

function changeAmount (good: { id: number, title: string, img: string, price: number, amount: number }, value: string) {
  const numericValue = +value
  good.amount = numericValue < 0 || numericValue > 10 ? 1 : numericValue
}

</script>

<template>
  <article class="w-full flex flex-col gap-5">
    <header class="px-2 lg:px-10 flex gap-2 items-center mb-5 cursor-pointer w-fit" @click="goBack">
      <Icon name="material-symbols:arrow-back-ios-new-rounded" size="1.25rem" />
      <h1 class="text-2xl lg:text-3xl font-bold">
        Корзина
        <span v-if="cart.length > 0">{{ totalPrice }} р.</span>
      </h1>
    </header>
    <section v-if="cart.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 max-h-96 overflow-auto">
      <ClientCartListItem v-for="good in cart" :key="good.id" :good="good" @change-amount="(value: string) => changeAmount(good, value)" />
    </section>
    <section v-else class="p-5">
      <h2 class="text-xl lg:text-2xl">
        Ваша корзина пуста...
      </h2>
    </section>
    <section v-if="cart.length > 0" class="p-2 flex flex-col gap-3 lg:px-10">
      <h2 class="text-2xl lg:text-3xl font-bold">
        Оформление заказа
      </h2>
      <ClientCartDeliveries />
      <ClientCartPayTypes />
      <ClientCartDates />
      <ClientCartCoupon />
      <button class="p-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white">
        Оформить заказ
      </button>
    </section>
  </article>
</template>
