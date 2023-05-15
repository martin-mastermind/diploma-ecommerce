<script setup lang="ts">
import { useComparison } from '~/store/client/comparison'
import { useAuthModal } from '~/composables/client/useAuthModal'
import { useFavourites } from '~/store/client/favourites'
import { useGoods } from '~/store/client/goods'

function goBack () {
  useRouter().go(-1)
}

const goodsStore = useGoods()
const comparisonStore = useComparison()

const { checkForAuth } = useAuthModal()
const { toggleFavourite } = useFavourites()

async function checkFavourite () {
  if (!await checkForAuth()) { return }

  await toggleFavourite(goodsStore.currentGood!.id)
}
</script>

<template>
  <article v-if="goodsStore.currentGood" class="w-full flex flex-col gap-5">
    <header class="px-2 lg:px-10 flex gap-2 items-center mb-5 cursor-pointer w-fit" @click="goBack">
      <Icon name="material-symbols:arrow-back-ios-new-rounded" size="1.25rem" />
      <h1 class="text-2xl lg:text-3xl font-bold">
        {{ goodsStore.currentGood.title }}
      </h1>
    </header>
    <ClientGoodInformation :good="goodsStore.currentGood" />
    <ClientGoodReviews :rating="goodsStore.currentGood.rating" />
    <section class="sticky bottom-[50px] md:bottom-[55px] lg:bottom-[68px] bg-white flex items-center gap-1">
      <button class="p-3 w-4/6 xl:w-1/2 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white">
        Добавить в корзину
      </button>
      <div class="w-2/6 xl:w-1/2 xl:justify-around flex justify-center gap-5">
        <ClientUiIconButton name="material-symbols:favorite-outline-rounded" @click="checkFavourite" />
        <ClientUiIconButton name="material-symbols:candlestick-chart-outline-rounded" @click="comparisonStore.toggleComparison(goodsStore.currentGood.id)" />
      </div>
    </section>
  </article>
</template>
