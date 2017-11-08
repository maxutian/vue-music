import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlaying: true,
    iconText: 'pause_circle_outline',
    playText: '暂停',
    showList: false,
    curTab: 'songlists',
    mp3Url: '',
    playIndex: 0,
    isRepeating: false,
    songList: [{
      name: 'Adieu',
      id: '16148503',
      duration: '03:43',
      arname: '17 Hippies'
    },
    {
      name: 'Mes mots tes lèvres douces',
      id: '30841948',
      duration: '03:02',
      arname: 'Laurie Darmon'
    },
    {
      name: 'Seven Nation Army',
      id: '26933374',
      duration: '02:58',
      arname: "Ben l'oncle Soul"
    }]
  },
  mutations: {
    switchTab: (state, tab) => {
      state.curTab = tab
    },
    playMusic: state => {
      state.isPlaying = true
      state.iconText = 'pause_circle_outline'
      state.playText = '暂停'
    },
    pauseMusic: state => {
      state.isPlaying = false
      state.iconText = 'play_circle_outline'
      state.playText = '播放'
    },
    addSong: (state, obj) => {
      for (let item in state.songList) {
        if (state.songList[item].id === obj.id) {
          state.isRepeating = true
          return
        }
      }
      state.songList.unshift(obj)
    },
    pushSong: (state, obj) => {
      state.songList.push(obj)
    },
    clearList: state => {
      state.songList = []
    },
    changeRepeatValue: state => {
      state.isRepeating = !state.isRepeating
    }
  },
  actions: {
  }
})
