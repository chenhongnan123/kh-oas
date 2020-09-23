import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#328DDA',
        secondary: '#13253C',
        accent: '#283B52',
        error: '#D0021B',
        info: '#5F6D7E',
        success: '#7ED321',
        warning: '#E65100',
        attention: '#FBC02D',
      }
    }
  },
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
  icons: {
    // clock: 'mdi-barcode-scan',
    // history: 'mdi-history',
  },
});
