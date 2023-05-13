<script setup lang="ts">
const dateRef = ref<HTMLInputElement | null>()
const deliveryDate = ref<Date | null>(null)
function updateDate () {
  deliveryDate.value = dateRef.value!.valueAsDate
}
const dateMinMax = computed(() => {
  const min = new Date()
  const max = new Date()
  max.setDate(max.getDate() + 7)

  return {
    min: min.toISOString().split('T')[0],
    max: max.toISOString().split('T')[0]
  }
})

const fromTimeRef = ref<HTMLInputElement | null>()
const toTimeRef = ref<HTMLInputElement | null>()
const deliveryTime = ref<{from: string | null, to: string | null}>({
  from: '08:00',
  to: '20:00'
})
function updateFromTime () {
  deliveryTime.value.from = fromTimeRef.value!.value
}
function updateToTime () {
  deliveryTime.value.to = toTimeRef.value!.value
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <h3 class="text-xl lg:text-2xl font-bold">
      Дата и время доставки
    </h3>
    <section class="flex flex-col gap-3">
      <label class="flex flex-col gap-1">
        Дата доставки
        <input
          ref="dateRef"
          :value="deliveryDate"
          class="rounded-md outline-none border border-blue-950 p-2"
          placeholder="Дата доставки"
          type="date"
          :min="dateMinMax.min"
          :max="dateMinMax.max"
          @blur="updateDate"
        >
      </label>
      <section class="flex flex-col gap-2">
        <h4>Предпочтительное время доставки (рабочее время - c 8:00 до 20:00)</h4>
        <div class="flex gap-2">
          <input
            ref="fromTimeRef"
            :value="deliveryTime.from"
            class="w-1/2 rounded-md outline-none border border-blue-950 p-2"
            type="time"
            min="08:00"
            max="20:00"
            @blur="updateFromTime"
          >
          <input
            ref="toTimeRef"
            :value="deliveryTime.to"
            class="w-1/2 rounded-md outline-none border border-blue-950 p-2"
            type="time"
            min="08:00"
            max="20:00"
            @blur="updateToTime"
          >
        </div>
      </section>
    </section>
  </section>
</template>
