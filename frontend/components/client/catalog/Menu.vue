<script setup lang="ts">
import { useSort } from '~/composables/client/useSort'
import { useFilter } from '~/composables/client/useFilter'

const { isSortOpen, sortOptions, selectedSort, toggleSort, changeSort } = useSort()
const { isFilterOpen, filterValue, toggleFilter, applyFilter } = useFilter()
</script>

<template>
  <section class="flex items-center justify-center border-collapse border-y border-blue-950">
    <div class="w-1/2 p-2 border-r border-blue-950 relative">
      <p class="w-full flex gap-2 justify-center cursor-pointer select-none" @click="toggleSort">
        <span>Сортировка</span>
        <Icon name="prime:sort-alt" size="1.5rem" :data-open="isSortOpen" class="data-[open=true]:text-blue-950 transition-all" />
      </p>
      <div :data-active="isSortOpen" class="rounded-lg w-[250px] bg-white z-10 absolute hidden data-[active=true]:flex shadow-md p-5 flex-col gap-3 md:w-full max-w-md">
        <div v-for="option in sortOptions" :key="option.type" :data-selected="selectedSort === option.type" class="data-[selected=true]:underline data-[selected=true]:font-bold cursor-pointer hover:underline" @click="changeSort(option.type)">
          {{ option.title }}
        </div>
      </div>
    </div>
    <div class="w-1/2 p-2 flex gap-2 justify-center relative">
      <p class="w-full flex gap-2 justify-center cursor-pointer select-none" @click="toggleFilter">
        <span>Фильтр</span>
        <Icon name="material-symbols:filter-list-rounded" size="1.5rem" :data-open="isFilterOpen" class="data-[open=true]:text-blue-950 transition-all" />
      </p>
      <div :data-active="isFilterOpen" class="rounded-lg w-[250px] left-[-125px] top-[25px] bg-white z-10 absolute hidden data-[active=true]:flex shadow-md p-5 flex-col gap-3 md:w-full max-w-md md:left-0 xl:left-1/2 xl:-translate-x-1/2">
        <span class="font-bold">Цена</span>
        <form class="flex flex-col gap-2">
          <label class="flex flex-col gap-1">От<input v-model="filterValue.from" class="rounded-md outline-none border border-blue-950 p-2" placeholder="0.00" type="number"></label>
          <label class="flex flex-col gap-1">До<input v-model="filterValue.to" class="rounded-md outline-none border border-blue-950 p-2" placeholder="99.99" type="number"></label>
        </form>
        <button class="rounded-md bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white p-2" @click="applyFilter">
          Применить
        </button>
      </div>
    </div>
  </section>
</template>
