// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import utils from './utils';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMaterial from 'vue-material';
import VueProgressiveImage from 'vue-progressive-image';
import './filters';
import './style/style.css';
import './style/detail.css';
import './style/animation.css';
import './style/player.css';
import './style/playlist.css';
import 'vue-material/dist/vue-material.css';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueAxios, axios);
Vue.use(VueProgressiveImage);
Vue.use(utils);

// use&config VueMaterial
Vue.material.registerTheme({
  default: {
    primary: 'light-blue',
    accent: 'red',
    warn: 'red',
    color: 'white',
    background: 'white'
  },
  tabbar: {
    primary: 'white',
    accent: 'red'
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
