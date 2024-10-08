// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install (app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el: 指令所绑定的元素，img
                // binding: bingding.value是指令“=”后面的值，即图片的src
                const {stop} = useIntersectionObserver(
                    el,
                    ([{isIntersecting}]) => {
                        if (isIntersecting) {
                            // 进入可视区域，加载图片
                            el.src = binding.value
                            // 第一次加载后，停止监听，防止性能浪费
                            stop()
                        }
                    }
                )
            }
        })
    }
}