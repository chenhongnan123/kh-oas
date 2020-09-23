import Vue from 'vue'
import App from '@/App.vue'
// import vueRotuer from 'vue-router';
import store from '@/store';
import router from '@/routerConfig';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import 'vuetify/dist/vuetify.min.css';

import './plugins/highcharts';

Vue.config.productionTip = false




new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
  i18n
}).$mount('#app')
