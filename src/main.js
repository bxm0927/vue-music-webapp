// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router' // vue-router
import store from './store' // vuex

import '@/common/scss/index.scss'

// 移动端调试工具，在移动端输出日志
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
// console.log('Hello world')

// 消除 click 移动浏览器300ms延迟
import attachFastClick from 'fastclick'
attachFastClick.attach(document.body)

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/common/img/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
  // render: h => h(App)
})
