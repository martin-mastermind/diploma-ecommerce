import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useCart = defineStore('cartStore', () => {
  const cartData = ref<Client.CartItem[]>([])
  const cartItemsPreview = ref<Client.GoodPreview[]>([])

  const cartItems = computed<Client.CartListItem[]>(() => {
    const result = []

    for (const preview of cartItemsPreview.value) {
      const data = cartData.value.find(c => c.id === preview.id)

      if (data == null) { continue }

      result.push({
        id: preview.id,
        title: preview.title,
        img: preview.img,
        price: preview.price!,
        amount: data.amount
      })
    }

    return result
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
    if (cartData.value.length === 0) {
      cartItemsPreview.value = []
      return false
    }

    const result = await useApi('/api/cart/list', { ids: JSON.stringify(cartData.value.map(c => c.id)) }).get()

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

  return { cartData, cartItems, totalCartPrice, itemInCart, getCartItems, toggleCartItem, updateCartItemAmount }
}, {
  persist: true
})
