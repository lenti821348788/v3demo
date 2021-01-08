import {
    createApp
} from 'vue'
import App from './App.vue'
import './index.css'

// vite时, 不能省略文件后缀
import GlobalText from './components/GlobalText.vue'

// 得到一个根实例
const app = createApp(App);
// 注册全局组件
app.component('GlobalText', GlobalText)
app.mount('#app')