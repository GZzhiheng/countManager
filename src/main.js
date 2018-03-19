/**
 * 入口JS文件
 *
 */
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import Vuex from 'vuex'
import router from './router'
import states from './store/States'
import actions from './store/Actions'
import mutations from './store/Mutations'
import getters from './store/Getters'
import VueResource from 'vue-resource'
import NgPlugins from './ng-plugins'
import ElementUI from 'element-ui'
import '../static/res/images/mcm-1-Icon.png'
import '../static/res/styles/element-ui.css'
import '../static/res/styles/accountManager.css?_=1.0'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)

const store = new Vuex.Store({
  state: states,
  actions: actions,
  mutations: mutations,
  getters: getters
})
// 注册自定义插件(附加仓库数据)
Vue.use(NgPlugins, {})

/** 请注意，下面这行不能删，删了你试试看? **/
if (window.vueAc) {
  window.vueAc.$destroy()
}
// http请求超时处理
Vue.http.interceptors.push(function (request, next) {
  let response
  // console.log(request)
  if (request.timeout) { // 如果求情设置了超时就超时后返回response
    setTimeout(() => {
      next(request.respondWith(response, { // 定义请求超时的response对象
        status: 408,
        statusText: '请求超时...'
      }))
    }, request.timeout)
  }
  next((response) => {
    return response
  })
})
/* eslint-disable no-new */
let $vueAc = new Vue({
  el: '#creation',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
window.vueAc = $vueAc
