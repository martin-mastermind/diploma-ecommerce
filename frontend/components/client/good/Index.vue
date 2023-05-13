<script setup lang="ts">
function goBack () {
  useRouter().go(-1)
}

const good = computed(() => (
  {
    id: 1,
    title: 'Банан',
    vendor_code: 'G-1000',
    img: 'https://cs8.pikabu.ru/post_img/big/2016/04/21/5/1461224935173673.jpg',
    origin_country: 'Зимбабве',
    price: 2.5,
    description: 'Свежая спаржа хрустящая и сочная. Запах нейтральный. Обладает свежим, ореховым и сладковатым вкусом. Спаржу можно есть в сыром в виде. Если хочется термически обработать продукт, её можно приготовить на гриле, запечь, потушить или отварить в течение 15-20 минут. Важно: в пищу употребляется только верхняя часть растения.',
    characteristic: `Пищевая ценность на 100 г
Белки: 1.5
Жиры: 0.5
Углеводы: 21
Энергетическая ценность: 89 ккал / 372 кДж`,
    weight: '1-1.2 кг',
    rating: {
      total: 4.4,
      reviews: [
        {
          name: 'Мартин',
          message: 'Вкусные бананы',
          rating: 5
        },
        {
          name: 'Максим',
          message: 'Бананы такие себе, за такую цену сойдет, но больше брать их не буду.',
          rating: 4
        }
      ]
    }
  }
))
</script>

<template>
  <article class="w-full flex flex-col gap-5">
    <header class="px-2 lg:px-10 flex gap-2 items-center mb-5 cursor-pointer w-fit" @click="goBack">
      <Icon name="material-symbols:arrow-back-ios-new-rounded" size="1.25rem" />
      <h1 class="text-2xl lg:text-3xl font-bold">
        {{ good.title }}
      </h1>
    </header>
    <ClientGoodInformation :good="good" />
    <ClientGoodReviews :rating="good.rating" />
    <section class="sticky bottom-[50px] md:bottom-[55px] lg:bottom-[68px] bg-white flex items-center gap-1">
      <button class="p-3 w-4/6 xl:w-1/2 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white">
        Добавить в корзину
      </button>
      <div class="w-2/6 xl:w-1/2 xl:justify-around flex justify-center gap-5">
        <div class="p-0.5 flex justify-center items-center lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
          <Icon name="material-symbols:favorite-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
        </div>
        <div class="p-0.5 flex justify-center items-center lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
          <Icon name="material-symbols:candlestick-chart-outline-rounded" size="1.5rem" class="lg:w-7 lg:h-7" />
        </div>
      </div>
    </section>
  </article>
</template>
