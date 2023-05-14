<script setup lang="ts">
defineProps<{
  isOpened: boolean
  id: number
}>()

const data = ref<{
  city: string | null
  street: string | null
  house: number | null
  entrance: number | null
  floor: number | null
  apartment: number | null
}>({
  city: null,
  street: null,
  house: null,
  entrance: null,
  floor: null,
  apartment: null
})

const emit = defineEmits(['update:isOpened'])

function saveChanges () {
  alert('Адрес сохранен')
}
</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] bg-slate-100 rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center">
        <h2 class="text-lg font-bold md:text-2xl">
          Редактирование адреса
        </h2>
        <ClientUiIconButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5 lg:flex-row lg:flex-wrap">
        <ClientUiInput v-model:value="data.city" label="Город" type="text" placeholder="Минск" />
        <ClientUiInput v-model:value="data.street" label="Улица" type="text" placeholder="Пулихова" />
        <ClientUiInput v-model:value="data.house" label="Дом" type="number" placeholder="5" />
        <ClientUiInput v-model:value="data.entrance" label="Подъезд" type="number" placeholder="2" />
        <ClientUiInput v-model:value="data.floor" label="Этаж" type="number" placeholder="7" />
        <ClientUiInput v-model:value="data.apartment" label="Квартира" type="number" placeholder="45" />
      </article>
      <footer class="mt-auto flex w-full justify-end gap-5">
        <button class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700" @click="saveChanges">
          Сохранить
        </button>
      </footer>
    </section>
  </div>
</template>
