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

    <!-- 进度条&&时间 -->

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
    </button>
    <div id="volume-duration">
      <vue-slider v-bind="volumeProgress" v-model="volume"></vue-slider>
    </div>

    <!-- playlist -->

    <div ref="listbody">

      <button class="v-playlist-button" @click="showList()">
        <i class="material-icons" style="font-size: 2.5em;margin-left: 5px;margin-top: 3px;">
          playlist_play
        </i>
      </button>

      <div class="v-playlist-body">
        <transition name="showlist">

          <div id="v-playlist" v-if="(this.$store.state.showList)">

            <div class="v-playlist-tabbar">
              <button class="v-playlist-clear" style="margin-left: 2.5%;" @click="clearList()">
                <i class="material-icons" style="font-size: 1.8em;">delete_sweep</i>
              </button>
              <div class="v-playlist-title">
                <span style="font-weight: 700">播放列表</span>
              </div>
              <button class="v-playlist-close" style="margin-right: 5px;" @click="showList()">
                <i class="material-icons" style="font-size: 1em;margin-top: 3px;">close</i>
              </button>
            </div>
            
            <div style="width:100%; height: 15px;"></div>

            <div style="margin-top: 40px;">
              <md-list-item v-for="(item, index) in this.$store.state.songList" :key="item.id" @click.native="changeUrl(index)" class="v-detail-items v-playlist-items">
                <md-ink-ripple />
                <md-icon class="v-detail-icon">play_arrow</md-icon>
                <div><span style="color: #e9382a;font-weight: 500;">{{item.name}}</span> / {{item.arname}}</div>
                <div>{{item.duration}}</div>
                <md-divider class="md-inset"></md-divider>
              </md-list-item>
            </div>
          </div>

        </transition>
      </div>
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
    setInterval: function () {
      if (this.$store.state.songList.length === 0) {
        return;
      } else {
        this.update = setInterval(this.currentTime, 100);
      }
    },
    playControl: function () {
      if (this.$store.state.isPlaying) {
        this.$store.commit('pauseMusic');
        this.$refs.player.pause();
      } else {
        this.$store.commit('playMusic');
        this.$refs.player.play();
      }
    },
    nextSong: function () {
      if (this.$store.state.playIndex === this.$store.state.songList.length - 1) {
        this.$store.state.playIndex = 0;
        this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[0].id).then(res => {
          this.$store.state.mp3Url = res.data.data[0].url;
          this.$store.state.playIndex = 0;
        });
      } else {
        this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[this.$store.state.playIndex + 1].id).then(res => {
          this.$store.state.playIndex++;
          this.$store.state.mp3Url = res.data.data[0].url;
        });
      }
    },
    preSong: function () {
      if (this.$store.state.playIndex === 0) {
        this.$store.state.playIndex = this.$store.state.songList.length - 1;
        this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[this.$store.state.songList.length - 1].id).then(res => {
          this.$store.state.playIndex = this.$store.state.songList.length - 1;
          this.$store.state.mp3Url = res.data.data[0].url;
        });
      } else {
        this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[this.$store.state.playIndex - 1].id).then(res => {
          this.$store.state.playIndex--;
          this.$store.state.mp3Url = res.data.data[0].url;
        });
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
      this.nextSong();
      this.progress = 0;
    },
    showList: function () {
      this.$store.state.showList = !this.$store.state.showList;
    },
    clearList: function () {
      this.$store.commit('clearList');
    },
    changeUrl: function (index) {
      this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[index].id).then(res => {
        this.$store.state.mp3Url = res.data.data[0].url;
        this.$store.state.playIndex = index;
        this.$store.commit('playMusic');
      });
    }
  },
  mounted: function () {
    this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[0].id).then(res => {
      this.$store.state.mp3Url = res.data.data[0].url;
    });
    document.addEventListener('click', (e) => {
      if (this.$store.state.showList && this.$refs.listbody.contains(e.target)) {
        return;
      } else {
        this.$store.state.showList = false;
      }
    });
  },
  computed: {
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

</style>
