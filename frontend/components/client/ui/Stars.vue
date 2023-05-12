<script setup lang="ts">
const props = defineProps<{
  rating: number
  isBig?: boolean
}>()

const fullStars = computed(() => Math.floor(props.rating))
const needHalf = computed(() => props.rating % 1 !== 0)
const emptyStars = computed(() => Math.ceil(5 - props.rating - (needHalf.value ? 1 : 0)))

const starSize = computed(() => props.isBig ? '2rem' : '1.5rem')
</script>

<template>
  <div class="flex">
    <Icon v-for="star in fullStars" :key="star" name="material-symbols:star-rounded" :size="starSize" class="text-blue-800" />
    <Icon v-if="needHalf" name="material-symbols:star-half-rounded" :size="starSize" class="text-blue-800" />
    <Icon v-for="star in emptyStars" :key="star" name="material-symbols:star-outline-rounded" :size="starSize" class="text-blue-800" />
  </div>
</template>
