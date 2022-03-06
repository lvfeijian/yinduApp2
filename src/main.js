import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import i18n from '@/lang/index.js'
Vue.config.productionTip = false
// Vue.prototype.$i18n = i18n
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
