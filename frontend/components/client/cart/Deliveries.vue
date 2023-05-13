<script setup lang="ts">
const userDeliveries = ref([
  {
    id: 1,
    city: 'Минск',
    street: 'Пулихова',
    house: 31,
    entrance: 2,
    floor: 7,
    apartment: 45
  }
])
const deliveryOption = computed(() => {
  return (delivery: {id: number, city: string, street: string, house: number, entrance: number, floor: number, apartment: number}) => {
    return `г.${delivery.city}, ул.${delivery.street} ${delivery.house}, п.${delivery.entrance}, эт.${delivery.floor}, кв.${delivery.apartment}`
  }
})
</script>

<template>
  <section class="flex flex-col gap-2">
    <header class="flex gap-2 items-center">
      <h3 class="text-xl lg:text-2xl font-bold">
        Адрес доставки
      </h3>
      <div class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
        <Icon name="material-symbols:add-circle-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
      </div>
    </header>
    <select class="p-2 rounded-lg border border-blue-950">
      <option v-for="delivery in userDeliveries" :key="delivery.id" :value="delivery.id">
        {{ deliveryOption(delivery) }}
      </option>
    </select>
  </section>
</template>
