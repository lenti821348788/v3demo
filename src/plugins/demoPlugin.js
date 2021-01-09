const Obj = {
    install: function (app, options) {
        console.log('install:', app)
        // 整个应用程序可以的键, 相当于之前的 Vue.prototype.$globalName
        app.config.globalProperties.$globalName = 'this is a globalName from plugins'
        /** 
         * app.mixin 在插件中绑定全局混入
         * app.directive 在插件中绑定全局指令
         * app.provide 在插件中提供全局注入
         * app.config中有各种属性
        */
    }
}
export default Obj;