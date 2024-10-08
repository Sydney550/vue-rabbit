import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'


import App from './App.vue'
import router from './router'

import '@/styles/common.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

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
                    stop()
                }
            }
        )
    }
})