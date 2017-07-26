import Vue from 'vue'
import App from './App.vue'
import AppHeader from './App-Header.vue'
import axios from 'axios'

Vue.prototype.$http = axios

export const EventBus = new Vue();

Vue.component('app-header', AppHeader)
Vue.component('app-list', App)
new Vue({
  el: '#app'
  // render: h => h(App)
  // template: '<App/>',
  // components: { App }
})
