<script setup lang="ts">
import { useOrders } from '~/store/admin/orders'

import { useOrder } from '~/composables/admin/useOrder'

const props = defineProps<{
  isOpened: boolean
  id: number
}>()

const emit = defineEmits(['update:isOpened', 'refetchList'])
const { data, cannotSave, save, clear } = useOrder()

const ordersStore = useOrders()
watch(() => props.isOpened, () => {
  if (!props.isOpened) { return }
  clear()

  if (props.id === 0) { return }
  ordersStore.getOrder(props.id)
})

const goodsSum = computed(() => {
  let result = 0

  for (const good of data.value.goods) {
    const discount = data.value.coupon
      ? data.value.coupon.rules.find(c => c.category === good.category)?.discount ?? data.value.coupon.total_discount
      : 0
    const discountModifier = (100 - discount) / 100

    result += good.price * good.amount * discountModifier
  }

  return result.toFixed(2)
})

const payTypes = computed(() => [
  {
    key: 'cash',
    name: 'Наличными',
    value: 'cash'
  },
  {
    key: 'card',
    name: 'Картой курьеру',
    value: 'card'
  }
])

const statuses = computed(() => [
  {
    key: 'new',
    name: 'Создан',
    value: 'new'
  },
  {
    key: 'in-work',
    name: 'В работе',
    value: 'in-work'
  },
  {
    key: 'success',
    name: 'Выполнен',
    value: 'success'
  },
  {
    key: 'canceled',
    name: 'Отменен',
    value: 'canceled'
  }
])

async function saveChanges () {
  if (!await save(props.id)) { return }

  emit('refetchList')
  emit('update:isOpened', false)
}
</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] h-[90%] bg-slate-100 rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center text-3xl">
        <h2>Редактирование заказа</h2>
        <AdminUiControlButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5">
        <section class="flex flex-col gap-2">
          <h2 class="text-2xl">
            Пользователь
          </h2>
          <AdminOrdersUserTable :user="data.user" />
        </section>
        <section class="flex flex-col gap-2">
          <h2 class="text-2xl">
            Адрес доставки
          </h2>
          <div class="flex flex-col gap-2">
            <AdminOrdersUserDeliveryTable :user-delivery="data.user_delivery" />
            <AdminUiTextArea
              v-if="data.user_delivery.commentary"
              id="commentary"
              v-model="data.user_delivery.commentary"
              label="Комментарий пользователя"
              disabled
            />
          </div>
        </section>
        <section v-if="data.coupon" class="flex flex-col gap-2">
          <h2 class="text-2xl">
            Купон
          </h2>
          <div class="grid grid-cols-2 gap-2">
            <AdminUiInput
              id="code"
              v-model="data.coupon.code"
              type="text"
              label="Код"
              disabled
            />
            <AdminUiInput
              id="total_discount"
              v-model="data.coupon.total_discount"
              type="text"
              label="Общая скидка (в %)"
              disabled
            />
          </div>
          <AdminOrdersCouponRulesTable :rules="data.coupon.rules" />
        </section>
        <section class="flex flex-col gap-2">
          <h2 class="text-2xl">
            Товары
          </h2>
          <p class="text-xl">
            Общая стоимость: {{ goodsSum }} рублей
          </p>
          <AdminOrdersGoodsTable :goods="data.goods" />
        </section>
        <section class="flex flex-col gap-2">
          <h2 class="text-2xl">
            Общая информация
          </h2>
          <div class="grid grid-cols-2 gap-2">
            <AdminUiDropdown
              id="pay_type"
              v-model="data.pay_type"
              label="Метод оплаты"
              :options="payTypes"
              disabled
            />
            <AdminUiInput
              id="delivery_date"
              v-model="data.delivery_date"
              type="text"
              label="Дата доставки"
              disabled
            />
            <AdminUiInput
              id="delivery_from_time"
              v-model="data.delivery_from_time"
              type="text"
              label="Время доставки (с)"
              disabled
            />
            <AdminUiInput
              id="delivery_to_time"
              v-model="data.delivery_to_time"
              type="text"
              label="Время доставки (до)"
              disabled
            />
            <AdminUiDropdown
              id="status"
              v-model="data.status"
              label="Статус"
              :options="statuses"
            />
          </div>
        </section>
      </article>
      <footer class="mt-auto flex w-full justify-end gap-5">
        <button :disabled="cannotSave" class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700" @click="saveChanges">
          Сохранить
        </button>
      </footer>
    </section>
  </div>
</template>
