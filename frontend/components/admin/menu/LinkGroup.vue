<script setup lang="ts">
defineProps<{
    title: string
}>()

const isHidden = ref(true)

function toggleSubMenu () {
  isHidden.value = !isHidden.value
}

</script>

<template>
  <section class="flex flex-col gap-1">
    <h2 :data-active="!isHidden" class="flex items-center text-xl gap-2 p-3 rounded-lg cursor-pointer hover:bg-slate-200 active:bg-slate-300 transition-colors data-[active=true]:bg-slate-200" @click="toggleSubMenu">
      <Icon :data-pressed="!isHidden" class="transition-transform data-[pressed=true]:rotate-180" name="ic:round-keyboard-arrow-down" size="22px" /> {{ title }}
    </h2>
    <ul :data-hidden="isHidden" class="flex flex-col text-lg ml-5 overflow-hidden transition-all data-[hidden=true]:h-0 h-full">
      <slot />
    </ul>
  </section>
</template>
