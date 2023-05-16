<script setup lang="ts">
import { useAuthModal } from '~/composables/client/useAuthModal'
import { useCart } from '~/store/client/cart'
import { useComparison } from '~/store/client/comparison'
import { useFavourites } from '~/store/client/favourites'

const props = defineProps<{
  good: Client.CartListItem
}>()

const { checkForAuth } = useAuthModal()
const { toggleFavourite } = useFavourites()

const comparisonStore = useComparison()
const cartStore = useCart()

const inputRef = ref<HTMLInputElement | null>(null)

function updateAmount () {
  const newAmount = +inputRef.value!.value

  cartStore.updateCartItemAmount(props.good.id, newAmount ?? 1)
}

async function checkFavourite () {
  if (!await checkForAuth()) { return }

  await toggleFavourite(props.good.id)
}

</script>
<template>
  <div class="flex flex-col gap-3 items-center">
    <div>
      <img class=" aspect-square object-contain max-h-20" :src="good.img" alt="" onerror="this.src = '/img/goods_placeholder.png'">
    </div>
    <span class="overflow-hidden max-w-[4rem] max-h-8 text-lg text-ellipsis">{{ good.title }}</span>
    <span class="font-bold">{{ good.price }} р.</span>
    <label class="flex items-center gap-1">
      <input
        ref="inputRef"
        :value="good.amount"
        class="rounded-md outline-none border border-blue-950 p-2"
        placeholder="1"
        type="number"
        min="0"
        max="10"
        step="1"
        @blur="updateAmount"
      >шт.
    </label>
    <div class="flex gap-2">
      <NuxtLink :to="`/good/${good.id}`">
        <ClientUiIconButton name="material-symbols:open-in-new-rounded" />
      </NuxtLink>
      <ClientUiIconButton name="material-symbols:delete-outline-rounded" @click="cartStore.toggleCartItem(good.id)" />
      <ClientUiIconButton name="material-symbols:favorite-outline-rounded" @click="checkFavourite" />
      <ClientUiIconButton name="material-symbols:candlestick-chart-outline-rounded" @click="comparisonStore.toggleComparison(good.id)" />
    </div>
  </div>
</template>
