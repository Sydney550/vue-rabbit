// 封装购物车模块
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    // 添加购物车：已添加过——count+1，未添加过——直接push
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }
  return {
    cartList,
    addCart
  }
}, {
  persist: true
})