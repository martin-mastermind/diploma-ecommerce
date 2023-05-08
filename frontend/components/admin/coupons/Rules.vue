<script setup lang="ts">
import { useCategories } from '~/store/admin/categories'

const props = defineProps<{
  rules: Rule[]
}>()

const emit = defineEmits(['update:rules'])

const categoriesStore = useCategories()

const categoriesOptions = computed(() => categoriesStore.categories.map(c => ({
  key: c.id,
  name: c.title,
  value: c.id
})))

function addRule () {
  emit('update:rules', [...props.rules, {
    id: 0,
    category_id: null,
    discount: 0
  }])
}

function removeRule (id: number) {
  const temp = [...props.rules]
  const ruleIndex = temp.findIndex(r => r.id === id)

  if (ruleIndex === -1) { return }
  temp.splice(ruleIndex, 1)
  emit('update:rules', temp)
}

</script>

<template>
  <section class="max-h-96 overflow-auto flex flex-col gap-5">
    <header class="flex gap-2 items-center text-xl">
      <h2>Правила купона</h2>
      <AdminUiControlButton name="material-symbols:add-rounded" @click="addRule" />
    </header>
    <article class="flex flex-col gap-5">
      <div v-for="rule in rules" :key="rule.id" class="flex items-center gap-5 pb-5 border-b last:border-b-0 border-slate-300">
        <Icon class="text-3xl cursor-pointer text-red-500 hover:text-red-600 active:text-red-700 transition-colors" name="material-symbols:delete-outline-rounded" @click="removeRule(rule.id)" />
        <AdminUiDropdown
          id="category_id"
          v-model="rule.category_id"
          class="w-1/2"
          label="Категория"
          :options="categoriesOptions"
        />
        <AdminUiInput
          id="discount"
          v-model="rule.discount"
          type="number"
          label="Скидка (в %)"
        />
      </div>
    </article>
  </section>
</template>
