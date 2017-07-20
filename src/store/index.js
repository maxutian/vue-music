import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPlaying: true,
    iconText: 'pause_circle_outline',
    playText: '暂停',
    showList: false,
    tabbarIndex: 0,
    mp3Url: '',
    playIndex: 0,
    songList: [{
      name: 'The Beautiful People',
      id: '21256392',
      duration: '03:38',
      arname: 'Marilyn Manson'
    }]
  },
  mutations: {
    listActive: state => {
      state.tabbarIndex = 0;
    },
    singerActive: state => {
      state.tabbarIndex = 1;
    },
    rankActive: state => {
      state.tabbarIndex = 2;
    },
    playMusic: state => {
      state.isPlaying = true;
      state.iconText = 'pause_circle_outline';
      state.playText = '暂停';
    },
    pauseMusic: state => {
      state.isPlaying = false;
      state.iconText = 'play_circle_outline';
      state.playText = '播放';
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
    pushSong: (state, obj) => {
      state.songList.push(obj);
    },
    clearList: state => {
      state.songList = [];
    }
  },
  actions: {
  }
});
