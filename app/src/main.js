import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { Toast, Dialog } from 'vant';

import '../rem';
import 'lib-flexible/flexible';

Vue.config.productionTip = true

Vue.use(Toast);
Vue.use(Dialog);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
