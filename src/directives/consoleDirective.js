function handler(e) {
    alert('click !!!  ,' + e.target.textContent)
}

// 注册的指令是一个对象
// 指令具有一组生命周期钩子
export default {
    // 绑定元素的父组件挂载之前调用
    beforeMount() {
        console.log('global directive beforeMount')
    },
    // 绑定元素的父组件挂载时使用
    mounted(el, binding) {
        // v-cl:arg.mod="123"
        // binding.arg -> arg; binding.modifiers.mod -> true; binding.value -> 123
        console.log({
            el,
            binding
        })
        console.log('global directive mounted')
        el.addEventListener('click', handler, false)
    },
    // 在包含组件的VNode更新之前调用
    beforeUpdate() {
        console.log('global directive beforeUpdate')
    },
    // 在包含组件的VNode及其子组件的VNode更新之后调用
    updated() {
        console.log('global directive updated')
    },
    // 在绑定元素的父组件卸载之前调用
    beforeUnmount(el, binding) {
        el.removeEventListener('click', handler, false)
        console.log('global directive beforeUnmount')
    },
    // 卸载绑定元素的父组件时调用
    unmounted() {
        console.log('global directive unmounted')
    }
}