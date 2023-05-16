<script setup lang="ts">
import { useComparison } from '~/store/client/comparison'
import { useAuthModal } from '~/composables/client/useAuthModal'
import { useFavourites } from '~/store/client/favourites'
import { useCart } from '~/store/client/cart'

const { checkForAuth } = useAuthModal()
const { toggleFavourite } = useFavourites()

const props = defineProps<{
  good: Client.GoodPreview
  needAddButton?: boolean
}>()

const comparisonStore = useComparison()
const cartStore = useCart()

async function checkCart () {
  if (!await checkForAuth()) { return }

  cartStore.toggleCartItem(props.good.id)
}

async function checkFavourite () {
  if (!await checkForAuth()) { return }

  await toggleFavourite(props.good.id)
}
</script>

<template>
  <div class="flex flex-col gap-1 cursor-pointer p-5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors select-none" @click="navigateTo(`/good/${good.id}`)">
    <img class="w-full aspect-square object-contain max-h-96" :src="good.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
    <div v-if="good.rating" class="flex gap-1 items-end">
      <ClientUiStars :rating="good.rating.total" />
      <span class="text-sm">{{ good.rating.total_reviews }}</span>
    </div>
    <span v-if="good.price" class="text-blue-900 text-md font-bold">{{ good.price }} р.</span>
    <span class="text-lg font-bold">{{ good.title }}</span>
    <div class="flex gap-3 items-center">
      <ClientUiIconButton v-if="needAddButton" name="material-symbols:shopping-cart-outline-rounded" @click.stop="checkCart" />
      <ClientUiIconButton name="material-symbols:favorite-outline-rounded" @click.stop="checkFavourite" />
      <ClientUiIconButton name="material-symbols:candlestick-chart-outline-rounded" @click.stop="comparisonStore.toggleComparison(good.id)" />
    </div>
  </div>
</template>
