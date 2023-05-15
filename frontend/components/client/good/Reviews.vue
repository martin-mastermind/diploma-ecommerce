<script setup lang="ts">
const starReviews = computed(() => (star: number) => props.rating.reviews!.filter(r => r.rating === star).length)

const props = defineProps<{
  rating: Client.GoodRating
}>()
</script>

<template>
  <div class="px-2 lg:px-10 flex flex-col gap-2">
    <h2 class="text-xl font-bold">
      Отзывы
    </h2>
    <section class="flex gap-5 items-center">
      <span class="flex gap-1 items-center">
        <ClientUiStars :is-big="true" :rating="rating.total" />
        <h3 class="text-xl font-bold">{{ rating.total }}</h3>
      </span>
      <span class="text-sm text-gray-500">{{ rating.total_reviews }} отзыва/-ов</span>
    </section>
    <section class="flex flex-col gap-1 ml-1">
      <div v-for="star in [5, 4, 3, 2, 1, 0]" :key="star" class="flex gap-2 items-center">
        <ClientUiStars :rating="star" />
        <span class="text-sm text-gray-500">{{ starReviews(star) }}</span>
      </div>
    </section>
    <section class="flex flex-col gap-5 max-h-96 overflow-auto">
      <div v-for="(review, i) in rating.reviews" :key="i" class="flex flex-col gap-1 border-t pt-2 border-blue-900">
        <header class="flex gap-2 items-center">
          <h4 class="text-lg font-bold">
            {{ review.name }}
          </h4>
          <ClientUiStars :rating="review.rating" />
        </header>
        <p class="block max-h-52 overflow-auto">
          {{ review.message }}
        </p>
      </div>
    </section>
    <section class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">
        Оставьте свой отзыв
      </h3>
      <label class="flex flex-col gap-1">
        Оценка (от 0 до 5)
        <input class="max-w-xl border border-blue-900 p-2 rounded-lg" type="number" min="0" max="5" step="1">
      </label>
      <label class="flex flex-col gap-1">
        Сообщение
        <textarea class="max-w-xl border border-blue-900 p-2 rounded-lg resize-none overflow-auto" cols="30" rows="10" />
      </label>
      <button class="max-w-xl bg-blue-700 text-white p-2 rounded-lg">
        Отправить
      </button>
    </section>
  </div>
</template>
