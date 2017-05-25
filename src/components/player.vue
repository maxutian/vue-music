<template>
  <div id="v-player-container">

    <audio ref="player" @ended="ended" id="v-player-music" :src="this.$store.state.mp3Url" @canplay="musicTime(), setInterval()" autoplay="autoplay">
    </audio>

    <!-- 三个按钮 -->

    <div id="v-player-control">
      <button @click="preSong()" class="v-player-pre">
        <i class="material-icons" id="previous">skip_previous</i>
        <md-tooltip md-direction="top">上一首</md-tooltip>
      </button>
      <button @click="playControl()" class="play-pause">
        <i class="material-icons" id="play-pause-icon">{{this.$store.state.iconText}}</i>
        <md-tooltip md-direction="top" id="play-pause-text">{{this.$store.state.playText}}</md-tooltip>
      </button>
      <button @click="nextSong()" class="v-player-next">
        <i class="material-icons" id="next">skip_next</i>
        <md-tooltip md-direction="top">下一首</md-tooltip>
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
      <md-tooltip md-direction="top">音量/静音</md-tooltip>
    </button>
    <div id="volume-duration">
      <vue-slider v-bind="volumeProgress" v-model="volume"></vue-slider>
    </div>

    <!-- playlist -->

    <div ref="listbody">

      <button class="v-playlist-button" @click="showList()">
        <i class="material-icons" style="font-size: 2.5em;margin-left: 5px;margin-top: 3px;">playlist_play</i>
        <md-tooltip md-direction="top">播放列表</md-tooltip>
      </button>

      <div class="v-playlist-body">
        <transition name="showlist">

          <div id="v-playlist" v-if="(this.$store.state.showList)">

            <div class="v-playlist-tabbar">
              <button class="v-playlist-clear" style="margin-left: 2.5%;" @click="clearList()">
                <i class="material-icons" style="font-size: 1.8em;">delete_sweep</i>
              </button>
              <div class="v-playlist-title">
                <span>播放列表</span>
              </div>
              <button class="v-playlist-close" style="margin-right: 5px;" @click="showList()">
                <i class="material-icons" style="font-size: 1em;margin-top: 3px;">close</i>
              </button>
            </div>
            
            <div style="width:100%; height: 15px;"></div>

            <div style="margin-top: 50px;">
              <md-list v-for="(item, index) in this.$store.state.songList" :key="item.id" @click.native="changeUrl(index)">
                <md-list-item class="v-detail-items v-playlist-items">
                  <md-ink-ripple />
                  <md-icon class="v-detail-icon">play_arrow</md-icon>
                  <div><span style="color: #e9382a;font-weight: 500;">{{item.name}}</span> / {{item.arname}}</div>
                  <div>{{item.duration}}</div>
                  <md-divider class="md-inset"></md-divider>
                </md-list-item>
              </md-list>
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
        this.axios.get('http://localhost:3000/music/url?id=' + this.$store.state.songList[0].id).then(res => {
          this.$store.state.mp3Url = res.data.data[0].url;
          this.$store.state.playIndex = 0;
        });
      } else {
        this.axios.get('http://localhost:3000/music/url?id=' + this.$store.state.songList[this.$store.state.playIndex + 1].id).then(res => {
          this.$store.state.mp3Url = res.data.data[0].url;
          this.$store.state.playIndex++;
        });
      }
    },
    preSong: function () {
      if (this.$store.state.playIndex === 0) {
        this.$store.state.playIndex = this.$store.state.songList.length - 1;
        this.axios.get('http://localhost:3000/music/url?id=' + this.$store.state.songList[this.$store.state.songList.length - 1].id).then(res => {
          this.$store.state.mp3Url = res.data.data[0].url;
          this.$store.state.playIndex = this.$store.state.songList.length - 1;
        });
      } else {
        this.axios.get('http://localhost:3000/music/url?id=' + this.$store.state.songList[this.$store.state.playIndex - 1].id).then(res => {
          this.$store.state.mp3Url = res.data.data[0].url;
          this.$store.state.playIndex--;
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
      this.axios.get('http://localhost:3000/music/url?id=' + this.$store.state.songList[index].id).then(res => {
        this.$store.state.mp3Url = res.data.data[0].url;
        this.$store.state.playIndex = index;
      });
    }
  },
  mounted: function () {
    this.axios.get('http://localhost:3000/music/url?id=' + this.$store.state.songList[0].id).then(res => {
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
.play-pause:hover,.v-player-pre:hover,.v-player-next:hover,.v-player-voice:hover,.v-playlist-button:hover{
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
.v-playlist-button{
  cursor: pointer;
  position: absolute;
  right: 1%;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
}
#v-playlist{
  z-index: 998;
  position: fixed;
  right: 0;
  bottom: 90px;
  width: 40%;
  height: 60%;
  overflow: scroll;
  background-color: #fff;
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px rgba(0,0,0,.14), 0 1px 18px rgba(0,0,0,.12);
}
#v-playlist::-webkit-scrollbar{
  width: 5px;
}
.v-playlist-tabbar{
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: fixed;
  right: 0;
  bottom: 60% + 40px;
  width: 40%;
  height: 50px;
  background-color: #06a2e5;
}
.v-playlist-title{
  width: 10%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background-color: #ccc;
}
.v-playlist-close,.v-playlist-clear{
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
}
.v-playlist-close:hover,.v-playlist-clear:hover{
  background-color: rgba(142,138,138,.5);
  transition: all .3s ease-out;
}
.v-playlist-items{
  width: 98%;
  margin-top: -13px;
}
.showlist-enter,.showlist-leave-active{
  opacity: 0;
}
.showlist-enter-active,.showlist-leave-active{
  transition: all .3s cubic-bezier(.69,.01,.04,1.17);
}
</style>
