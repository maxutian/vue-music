<template>
  <div id="v-player-container">
    <audio ref="player" @canplay="musicTime" @ended="ended" id="v-player-music">
      <source src="http://m2.music.126.net/XVILMKj3bTnirqOXc1x5xA==/1318314441705656.mp3">
    </audio>
    <div id="v-player-control">
      <button @click="" class="v-player-pre">
        <i class="material-icons" id="previous">skip_previous</i>
        <md-tooltip md-direction="top">上一首</md-tooltip>
      </button>
      <button @click="playControl" class="play-pause">
        <i class="material-icons" id="play-pause-icon">{{iconText}}</i>
        <md-tooltip md-direction="top" id="play-pause-text">{{playText}}</md-tooltip>
      </button>
      <button @click="" class="v-player-next">
        <i class="material-icons" id="next">skip_next</i>
        <md-tooltip md-direction="top">下一首</md-tooltip>
      </button>
    </div>
    <div id="progress">
      <vue-slider v-bind="duration" style="margin-left: 20px;" v-model="progress"></vue-slider>
    </div>
    <div id="time">
      <span>{{current}}</span>
      <span>/</span>
      <span>{{end}}</span>
    </div>
    <button @click="volumeControl" class="v-player-voice" style="margin-left: 1%;">
      <i class="material-icons" id="voice">{{viconText}}</i>
      <md-tooltip md-direction="top">音量/静音</md-tooltip>
    </button>
    <div id="volume-duration">
      <vue-slider v-bind="volumeProgress" v-model="volume"></vue-slider>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import Vue from 'vue';

export default {
  name: 'player',
  components: {
    vueSlider
  },
  data () {
    return {
      iconText: 'play_circle_outline',
      playText: '播放',
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
      }
    };
  },
  methods: {
    currentTime: function () {
      const currentTime = this.$refs.player.currentTime;
      this.current = Vue.options.filters.timeToStr(currentTime);
      this.progress = Number.parseInt(currentTime, 10);
    },
    musicTime: function () {
      const duration = this.$refs.player.duration;
      this.end = Vue.options.filters.timeToStr(duration);
      this.duration.max = Number.parseInt(duration, 10);
    },
    playControl: function () {
      this.update = setInterval(this.currentTime, 1000 / 60);
      if (this.$refs.player.paused) {
        this.iconText = 'pause_circle_outline';
        this.playText = '暂停';
        this.$refs.player.play();
      } else {
        this.iconText = 'play_circle_outline';
        this.playText = '播放';
        this.$refs.player.pause();
      }
    },
    volumeControl: function () {
      if (this.viconText === 'volume_up') {
        this.viconText = 'volume_off';
        this.$refs.player.muted = true;
      } else {
        this.viconText = 'volume_up';
        this.$refs.player.muted = false;
      }
    },
    ended: function () {
      clearInterval(this.update);
      this.iconText = 'play_circle_outline';
      this.playText = '播放';
      this.$refs.player.pause();
      this.progress = 0;
    }
  },
  mounted: function () {
  },
  watch: {
    progress: function (newValue, oldValue) {
      if (Math.abs(newValue - oldValue) > 1) {
        this.current = Vue.options.filters.timeToStr(newValue);
        this.$refs.player.currentTime = newValue;
      }
    },
    volume: function (newValue) {
      this.$refs.player.volume = newValue / 100;
    }
  }
};
</script>

<style>
  .play-pause:hover,.v-player-pre:hover,.v-player-next:hover,.v-player-voice:hover{
    background-color: rgba(142,138,138,.5);
    transition: all .3s ease-out;
  }
  #v-player-container{
    z-index: 2;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90px;
    background-color: #06a2e5;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
  }
  #v-player-control{
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .play-pause{
    cursor: pointer;
    width: 65px;
    height: 65px;
    margin-top: -3px;
    background-color: transparent;
    border: none;
    border-radius: 50%;
  }
  #play-pause-icon{
    font-size: 4em;
    margin-top: 3px;
  }
  .v-player-pre,.v-player-next{
    cursor: pointer;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    border-radius: 50%;
  }
  #previous,#next{
    font-size: 3em;
  }
  #progress{
    width: 65%;
  }
  #time{
    font-size: 1.3em;
    margin-left: 1%;
  }
  .v-player-voice{
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-top: 5px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
}
#volume-duration{
  width: 8%;
}
#voice{
  font-size: 2em;
}
</style>
