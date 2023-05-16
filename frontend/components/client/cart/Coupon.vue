<script setup lang="ts">
import { useEvent } from '~/composables/utils/useEventBus'

const couponRef = ref<HTMLInputElement | null>(null)
const coupon = ref<string | null>(null)
function updateCoupon () {
  coupon.value = couponRef.value!.value

  useEvent('cart:update', {
    coupon: coupon.value
  })
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <h3 class="text-xl lg:text-2xl font-bold">
      Купон (опционально)
    </h3>
    <input
      ref="couponRef"
      :value="coupon"
      class="rounded-md outline-none border border-blue-950 p-2"
      placeholder="Купон"
      type="text"
      @blur="updateCoupon"
    >
  </section>
</template>
