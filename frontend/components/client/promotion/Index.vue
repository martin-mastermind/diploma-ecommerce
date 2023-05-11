<script setup lang="ts">
const promotion = computed(() => ({
  title: '9 мая',
  message: 'Акция, приуроченная к празднику 9 мая! Отметь праздник, купив акционные товары.',
  img: 'https://www.belrynok.by/wp-content/uploads/2018/05/den_pobedy.jpg',
  total_discount: 10,
  rules: [
    {
      category: 'Фрукты',
      discount: 15
    }
  ]
}))
</script>

<template>
  <article class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      {{ promotion.title }}
    </h1>
    <section>
      <img class="w-full h-auto max-h-96 object-contain md:mx-auto" :src="promotion.img" alt="">
      <p class="italic md:text-lg">
        {{ promotion.message }}
      </p>
    </section>
    <section class="md:text-lg">
      <p class="font-bold">
        Изначальная скидка: {{ promotion.total_discount }}%
      </p>
      <div v-if="promotion.rules.length > 0">
        <h2 class="font-bold">
          Фиксированные скидки для категорий
        </h2>
        <ul class="px-10 list-disc">
          <li v-for="rule in promotion.rules" :key="rule.category">
            {{ rule.category }}: {{ rule.discount }}%
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
  article {
    grid-area: promotion;
  }
</style>
