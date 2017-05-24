// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMaterial from 'vue-material';
import './filters';
import './style/detail.css';
import './style/animation.css';
import 'vue-material/dist/vue-material.css';

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
    isPlaying: true,
    showList: false,
    listactive: true,
    singeractive: false,
    rankactive: false,
    mp3Url: '',
    playIndex: '',
    songList: [{
      name: 'The Beautiful People',
      id: '21256392',
      duration: '03:38',
      arname: 'Marilyn Manson'
    }]
  },
  mutations: {
    playMusic: state => {
      state.isPlaying = true;
    },
    pauseMusic: state => {
      state.isPlaying = false;
    },
    listActive: state => {
      state.listactive = true;
      state.singeractive = false;
      state.rankactive = false;
    },
    singerActive: state => {
      state.listactive = false;
      state.singeractive = true;
      state.rankactive = false;
    },
    rankActive: state => {
      state.listactive = false;
      state.singeractive = false;
      state.rankactive = true;
    },
    addSong: (state, obj) => {
      for (let item in state.songList) {
        if (state.songList[item].id === obj.id) {
          state.songList.splice(item, 1, obj);
          return;
        }
      }
      state.songList.unshift(obj);
    },
    clearList: state => {
      state.songList = [];
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
