import {
    // 返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。
    createApp,
    // 返回一个”虚拟节点“，通常缩写为 VNode：一个普通对象，其中包含向 Vue 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述。它的目的是用于手动编写的渲染函数：
    h,
    // 定义一个组件
    defineComponent,
    // 定义一个异步组件
    defineAsyncComponent,
    // 通过组件名字,得到一个组件,resolveComponent 只能在 render 或 setup 函数中使用
    resolveComponent,
    // 允许使用与 <component :is=""> 相同的机制来解析一个 component
    resolveDynamicComponent,
    // 通过其名称解析一个 directive, resolveDirective 只能在 render 或 setup 函数中使用。
    resolveDirective,
    // withDirectives 只能在 render 或 setup 函数中使用。 可以在h函数写入对象时,绑定指令
    withDirectives,
    // 自定义渲染器
    createRenderer,
    // 将回调推迟到下一个 DOM 更新周期之后执行
    nextTick,

} from 'vue'
import App from './App.vue'
import './index.css'

// vite时, 不能省略文件后缀
import GlobalText from './components/GlobalText.vue'
import consoleDirective from './directives/consoleDirective'
import demoPlugin from './plugins/demoPlugin'
// 得到一个应用实例
const app = createApp(App);
// 以下均可链式调用
// 注册全局插件, 当在同一个插件上多次调用此方法时，该插件将仅安装一次。
app.use(demoPlugin)
// 注册全局组件
app.component('GlobalText', GlobalText)

app.component('anchored-heading', {
    render() {
        // h函数从vue中导入
        return h(
            'h' + this.level, // tag name
            {
                onClick: $event => console.log('clicked', $event.target)
            }, // props/attributes 执行$slots.default()函数,得到一个数组
            this.$slots.default() // array of children
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})

// 注册全局配置
//  指定一个处理函数，来处理组件渲染方法执行期间以及侦听器抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和应用实例。
app.config.errorHandler = (err, vm, info) => {
    console.log('errorHandler', {
        err,
        vm,
        info
    })
}
//  为 Vue 的运行时警告指定一个自定义处理函数。
app.config.warnHandler = function (msg, vm, trace) {
    // `trace` 是组件的继承关系追踪
    console.log('warnHandler', {
        msg,
        vm,
        trace
    })
}
//  添加可以在应用程序内的任何组件实例中访问的全局 property。属性名冲突时，组件的 property 将具有优先权。
app.config.globalProperties.foo = 'bar'
// 指定一个方法，用来识别在 Vue 之外定义的自定义元素（例如，使用 Web Components API）。如果组件符合此条件，则不需要本地或全局注册，并且 Vue 不会抛出关于 Unknown custom element 的警告。所有原生 HTML 和 SVG 标记不需要在此函数中匹配——Vue 解析器自动执行此检查
app.config.isCustomElement = tag => tag.startsWith('ion-')
// 为自定义选项定义合并策略
app.config.optionMergeStrategies.hello = (parent, child, vm) => {
    return `Hello, ${child||parent}`
}
// 设置为 true 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器。
app.config.performance = true;
// 注册全局指令
app.directive('cl', consoleDirective)
// 注册全局混入
app.mixin({
    created() {
        // console.log('-------全局混入-------')
    }
})
// 设置一个可以被注入到应用范围内所有组件中的值, provide 和 inject 绑定不是响应式的。这是有意为之。不过，如果你向下传递一个响应式对象，这个对象上的 property 会保持响应式。
app.provide('author', 'Alian')
// 合并策略设置, 父实例toVal(mixin)和子实例fromVal(具体组件)上定义的该选项的值
app.config.optionMergeStrategies.customOption = (toVal, fromVal) => {
    // return mergedVal
}
// mount不返回应用本身,而是根组件的实例, 链式调用的终点
const vm = app.mount('#app')
// 在提供的 DOM 元素上卸载应用实例的根组件
// setTimeout(() => app.unmount('#app'), 5000)