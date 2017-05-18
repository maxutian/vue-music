// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import './filters';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

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

const store = new Vuex.Store({
  state: {
    isPlaying: false,
    listDisplay: 'display: none',
    showList: true
  },
  mutations: {
    showPlaylist: state => {
      if (state.showList) {
        state.listDisplay = 'display: block';
        state.showList = false;
      } else {
        state.listDisplay = 'display: none';
        state.showList = true;
      }
    },
    playMusic: state => {
      state.isPlaying = true;
    },
    pauseMusic: state => {
      state.isPlaying = false;
    }
  },
  actions: {
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
