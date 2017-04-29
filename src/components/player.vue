<template>
  <div id="v-player-container">
    <audio ref="player" @canplay="musicTime" id="v-player-music">
      <source src="http://m2.music.126.net/XVILMKj3bTnirqOXc1x5xA==/1318314441705656.mp3">
    </audio>
    <div id="v-player-control">
      <button @click="" class="v-player-pre">
        <i class="material-icons" id="previous">skip_previous</i>
        <md-tooltip md-direction="top">上一首</md-tooltip>
      </button>
      <button @click="playMusic" class="play-pause">
        <i class="material-icons" id="play-pause-icon">play_circle_outline</i>
        <md-tooltip md-direction="top" id="play-pause-text">播放</md-tooltip>
      </button>
      <button @click="" class="v-player-next">
        <i class="material-icons" id="next">skip_next</i>
        <md-tooltip md-direction="top">下一首</md-tooltip>
      </button>
    </div>
    <div id="progress">
      <vue-slider v-bind="duration" style="margin-left: 20px;"></vue-slider>
    </div>
    <div id="time">
      <span>{{currentTimer}}</span>
      <span>/</span>
      <span>{{endTime}}</span>
    </div>
    <button @click="volumeControl" class="v-player-voice" style="margin-left: 1%;">
      <i class="material-icons" id="voice">volume_up</i>
      <md-tooltip md-direction="top">音量/静音</md-tooltip>
    </button>
    <div id="volume-duration">
      <vue-slider v-bind="volume" style="margin-left: 10px;"></vue-slider>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
  name: 'player',
  components: {
    vueSlider
  },
  data () {
    return {
      duration: {
        tooltip: false,
        processStyle: {
          'background-color': '#e9382a'
        }
      },
      currentTimer: '00:00',
      endTime: '00:00',
      update: '',
      volume: {
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
    currentTime () {
      let cmin = Number.parseInt(this.$refs.player.currentTime / 60, 10);
      let csec = Number.parseInt(this.$refs.player.currentTime % 60, 10);
      cmin = cmin < 10 ? ('0' + cmin) : cmin;
      csec = csec < 10 ? ('0' + csec) : csec;
      this.currentTimer = cmin + ':' + csec;
    },
    musicTime () {
      let mmin = Number.parseInt(this.$refs.player.duration / 60, 10);
      let msec = Number.parseInt(this.$refs.player.duration % 60, 10);
      mmin = mmin < 10 ? ('0' + mmin) : mmin;
      msec = msec < 10 ? ('0' + msec) : msec;
      this.endTime = mmin + ':' + msec;
    },
    playMusic () {
      const ppi = document.getElementById('play-pause-icon');
      const ppt = document.getElementById('play-pause-text');
      if (this.$refs.player.paused) {
        ppi.innerHTML = 'pause_circle_outline';
        ppt.innerHTML = '暂停';
        this.$refs.player.play();
      } else {
        ppi.innerHTML = 'play_circle_outline';
        ppt.innerHTML = '播放';
        this.$refs.player.pause();
      }
    },
    volumeControl () {
      const voice = document.getElementById('voice');
      if (voice.innerHTML === 'volume_up') {
        voice.innerHTML = 'volume_off';
      } else {
        voice.innerHTML = 'volume_up';
      }
    }
  },
  mounted: function () {
    this.setInterval(this.currentTime(), 1000);
  }
};
</script>

<style>
  .play-pause:hover,.v-player-pre:hover,.v-player-next:hover,.v-player-voice:hover{
    background-color: rgba(142,138,138,.5);
    transition: all .3s ease-out;
  }
  #v-player-container{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90px;
    background-color: #06a2e5;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.3);
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
