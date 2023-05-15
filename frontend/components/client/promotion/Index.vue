<script setup lang="ts">
import { usePromotions } from '~/store/client/promotions'

const promotionsStore = usePromotions()
</script>

<template>
  <article v-if="promotionsStore.currentPromotion" class="w-full p-2 flex flex-col gap-2 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      {{ promotionsStore.currentPromotion.title }}
    </h1>
    <section>
      <img class="w-full h-auto max-h-96 object-contain md:mx-auto" :src="promotionsStore.currentPromotion.img" alt="">
      <p class="italic md:text-lg">
        {{ promotionsStore.currentPromotion.message }}
      </p>
    </section>
    <section class="md:text-lg">
      <p class="font-bold">
        Изначальная скидка: {{ promotionsStore.currentPromotion.total_discount }}%
      </p>
      <div v-if="promotionsStore.currentPromotion.rules.length > 0">
        <h2 class="font-bold">
          Фиксированные скидки для категорий
        </h2>
        <ul class="px-10 list-disc">
          <li v-for="rule in promotionsStore.currentPromotion.rules" :key="rule.category">
            {{ rule.category }}: {{ rule.discount }}%
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>
