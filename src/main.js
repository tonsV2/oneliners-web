// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vue.prototype.$hostname = process.env.NODE_ENV === 'development' ? 'http://' + window.location.hostname + ':8080/api' : 'http://oneliners.fitfit.dk:8080/api'
Vue.prototype.$backend = 'http://' + window.location.hostname + ':8080/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
