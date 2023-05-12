<script setup lang="ts">
const sortOpen = ref(false)
const sortOptions = ref([
  {
    type: 'default',
    title: 'По умолчанию'
  },
  {
    type: 'price-down',
    title: 'По убыванию цены'
  },
  {
    type: 'price-up',
    title: 'По возрастанию цены'
  },
  {
    type: 'rating',
    title: 'По рейтингу'
  }
])
const selectedSort = ref('default')
function toggleSort () {
  sortOpen.value = !sortOpen.value
  filterOpen.value = false
}
function changeSort (type: string) {
  selectedSort.value = type
  sortOpen.value = false
}

const filterOpen = ref(false)
const filterPrice = ref({
  from: null,
  to: null
})
function toggleFilter () {
  filterOpen.value = !filterOpen.value
  sortOpen.value = false
}
function applyFilter () {
  filterOpen.value = false
}
</script>

<template>
  <section class="flex items-center justify-center border-collapse border-y border-blue-950">
    <div class="w-1/2 p-2 border-r border-blue-950 relative">
      <p class="w-full flex gap-2 justify-center cursor-pointer" @click="toggleSort">
        <span>Сортировка</span>
        <Icon name="prime:sort-alt" size="1.5rem" :data-open="sortOpen" class="data-[open=true]:text-blue-950 transition-all" />
      </p>
      <div :data-active="sortOpen" class="rounded-lg w-[250px] bg-white z-10 absolute hidden data-[active=true]:flex shadow-md p-5 flex-col gap-3 md:w-full max-w-md">
        <div v-for="option in sortOptions" :key="option.type" :data-selected="selectedSort === option.type" class="data-[selected=true]:underline data-[selected=true]:font-bold" @click="changeSort(option.type)">
          {{ option.title }}
        </div>
      </div>
    </div>
    <div class="w-1/2 p-2 flex gap-2 justify-center relative">
      <p class="w-full flex gap-2 justify-center cursor-pointer" @click="toggleFilter">
        <span>Фильтр</span>
        <Icon name="material-symbols:filter-list-rounded" size="1.5rem" :data-open="filterOpen" class="data-[open=true]:text-blue-950 transition-all" />
      </p>
      <div :data-active="filterOpen" class="rounded-lg w-[250px] left-[-125px] top-[25px] bg-white z-10 absolute hidden data-[active=true]:flex shadow-md p-5 flex-col gap-3 md:w-full max-w-md md:left-0 xl:left-1/2 xl:-translate-x-1/2">
        <span class="font-bold">Цена</span>
        <form class="flex flex-col gap-2">
          <label class="flex flex-col gap-1">От<input v-model="filterPrice.from" class="rounded-md outline-none border border-blue-950 p-2" placeholder="0.00" type="number"></label>
          <label class="flex flex-col gap-1">До<input v-model="filterPrice.from" class="rounded-md outline-none border border-blue-950 p-2" placeholder="99.99" type="number"></label>
        </form>
        <button class="rounded-md bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white p-2" @click="applyFilter">
          Применить
        </button>
      </div>
    </div>
  </section>
</template>
