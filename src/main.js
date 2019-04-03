import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTrashAlt, faPen,faInfoCircle ,faCheck, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
//
//
// Vue.config.productionTip = false
// Vue.use(BootstrapVue);

library.add(faCoffee)
library.add(faTrashAlt)
library.add(faPen)
library.add(faInfoCircle)
library.add(faCheck)
library.add(faTimes)
library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
