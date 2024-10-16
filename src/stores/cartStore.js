// 封装购物车模块
import { defineStore } from "pinia"
import { ref, computed } from "vue"

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

  const delCart = (skuId) => {
    // 删除购物车
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }

  // 计算数量和总价
  const allCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
  const allPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))

  return {
    cartList,
    allCount,
    allPrice,
    addCart,
    delCart
  }
}, {
  persist: true
})