import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCart = defineStore('cartStore', () => {
  const cartData = ref<Client.CartItem[]>([])
  const cartItemsPreview = ref<Client.GoodPreview[]>([])

  const cartItems = computed<Client.CartListItem[]>(() => {
    return cartItemsPreview.value.map(cp => ({
      id: cp.id,
      title: cp.title,
      img: cp.img,
      price: cp.price!,
      amount: cartData.value.find(cd => cd.id === cp.id)?.amount ?? 0
    }))
  })

  const totalCartPrice = computed(() => {
    let result = 0
    for (const good of cartItems.value) {
      result += good.price * good.amount
    }
    return result.toFixed(2)
  })

  function itemInCart (id: number) {
    const idIndex = cartData.value.findIndex(c => c.id === id)
    return idIndex !== -1
  }

  async function getCartItems () {
    if (cartData.value.length === 0) { return false }

    const result = await useApi('/api/cart/list', { ids: cartData.value.map(c => c.id) }).get()

    if (result === false) {
      cartItemsPreview.value = []
      return false
    }

    cartItemsPreview.value = result as Client.GoodPreview[]
    return true
  }

  function toggleCartItem (id: number) {
    const idIndex = cartData.value.findIndex(c => c.id === id)

    if (idIndex === -1) {
      cartData.value.push({
        id, amount: 1
      })
      return
    }

    cartData.value.splice(idIndex, 1)
  }

  function updateCartItemAmount (id: number, amount: number) {
    const item = cartData.value.find(c => c.id === id)

    if (item == null) { return }
    if (amount === 0) {
      toggleCartItem(id)
      return
    }

    item.amount = amount
  }

  return { cartItems, totalCartPrice, itemInCart, getCartItems, toggleCartItem, updateCartItemAmount }
}, {
  persist: true
})
