<template>
  <div id="v-player-container">

    <audio ref="player" @ended="ended" id="v-player-music" :src="this.$store.state.mp3Url" @canplay="musicTime(), setInterval()" autoplay="autoplay">
    </audio>

    <!-- 三个按钮 -->

    <div id="v-player-control">
      <button @click="preSong()" class="v-player-pre">
        <i class="material-icons" id="previous">skip_previous</i>
      </button>
      <button @click="playControl()" class="play-pause">
        <i class="material-icons" id="play-pause-icon">{{this.$store.state.iconText}}</i>
      </button>
      <button @click="nextSong()" class="v-player-next">
        <i class="material-icons" id="next">skip_next</i>
      </button>
    </div>

    <!-- 进度条&&时间&&音量 -->

    <div id="progress">
      <vue-slider v-bind="duration" style="margin-left: 1%;" v-model="progress"></vue-slider>
    </div>
    <div id="time">
      <span>{{current}}</span>
      <span>/</span>
      <span>{{end}}</span>
    </div>
    <button @click="volumeControl" class="v-player-voice" style="margin-left: 10px !important;">
      <i class="material-icons" id="voice">{{viconText}}</i>
    </button>
    <div id="volume-duration">
      <vue-slider v-bind="volumeProgress" v-model="volume"></vue-slider>
    </div>

    <playlist></playlist>

  </div>
</template>

<script>
import Vue from 'vue'
import vueSlider from 'vue-slider-component'
import playlist from './playlist/playlist'

export default {
  name: 'player',
  components: {
    vueSlider,
    'playlist': playlist
  },
  data () {
    return {
      duration: {
        tooltip: false,
        min: 0,
        max: 100,
        processStyle: {
          'background-color': '#e9382a'
        }
      },
      progress: 0,
      current: '00:00',
      end: '00:00',
      update: '',
      viconText: 'volume_up',
      volume: 50,
      volumeProgress: {
        min: 0,
        max: 100,
        value: 50,
        tooltip: 'hover',
        processStyle: {
          'background-color': '#e9382a'
        },
        tooltipStyle: {
          'background-color': '#e9382a'
        }
      },
      playStatus: 'play_arrow'
    }
  },
  methods: {
    currentTime: function () {
      const currentTime = this.$refs.player.currentTime
      this.current = Vue.options.filters.timeToStr(currentTime)
      this.progress = Number.parseInt(currentTime, 10)
    },
    musicTime: function () {
      const duration = this.$refs.player.duration
      this.end = Vue.options.filters.timeToStr(duration)
      this.duration.max = Number.parseInt(duration, 10)
    },
    setInterval: function () {
      if (this.$store.state.songList.length === 0) {
        return
      } else {
        this.update = setInterval(this.currentTime, 100)
      }
    },
    playControl: function () {
      if (this.$store.state.isPlaying) {
        this.$store.commit('pauseMusic')
        this.$refs.player.pause()
      } else {
        this.$store.commit('playMusic')
        this.$refs.player.play()
      }
    },
    nextSong: function () {
      if (this.$store.state.playIndex === this.$store.state.songList.length - 1) {
        this.changeUrl(0)
        this.$store.state.playIndex = 0
      } else {
        this.changeUrl(this.$store.state.playIndex + 1)
      }
      this.$store.commit('playMusic')
    },
    preSong: function () {
      if (this.$store.state.playIndex === 0) {
        this.changeUrl(this.$store.state.songList.length - 1)
        this.$store.state.playIndex = this.$store.state.songList.length - 1
      } else {
        this.changeUrl(this.$store.state.playIndex - 1)
      }
      this.$store.commit('playMusic')
    },
    volumeControl: function () {
      if (this.viconText === 'volume_up') {
        this.viconText = 'volume_off'
        this.$refs.player.muted = true
      } else {
        this.viconText = 'volume_up'
        this.$refs.player.muted = false
      }
    },
    ended: function () {
      clearInterval(this.update)
      this.progress = 0
      this.nextSong()
    },
    showList: function () {
      this.$store.state.showList = !this.$store.state.showList
    },
    clearList: function () {
      this.$store.commit('clearList')
    },
    changeSong: function (index) {
      this.changeUrl(index)
      this.$store.commit('playMusic')
    }
  },
  mounted: function () {
    this.changeUrl(0)
  },
  watch: {
    progress: function (newValue, oldValue) {
      if (Math.abs(newValue - oldValue) > 1) {
        this.current = Vue.options.filters.timeToStr(newValue)
        this.$refs.player.currentTime = newValue
      }
    },
    volume: function (newValue) {
      this.$refs.player.volume = newValue / 100
    }
  }
}
</script>

<style>

</style>
