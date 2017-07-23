<template>

  <div ref="listbody">
    <md-button class="md-fab v-playlist-button" @click.native="showList()">
      <md-icon>playlist_play</md-icon>
    </md-button>

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

          <div style="margin-top: 37px;">
            <md-list-item v-for="(item, index) in this.$store.state.songList" :key="item.id" @click.native="changeSong(index)" class="v-detail-items v-playlist-items" :class="{'v-playlist-playing': songIsPlaying(index)}">
              <md-ink-ripple />
              <md-icon class="v-detail-icon">{{playStatus}}</md-icon>
              <div><span style="color: #e9382a;font-weight: 500;">{{item.name}}</span> / {{item.arname}}</div>
              <div>{{item.duration}}</div>
              <md-divider class="md-inset"></md-divider>
            </md-list-item>
          </div>
        </div>

      </transition>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';

export default {
  name: 'playlist',
  data () {
    return {
      playStatus: 'play_arrow'
    };
  },
  methods: {
    showList: function () {
      this.$store.state.showList = !this.$store.state.showList;
    },
    clearList: function () {
      this.$store.commit('clearList');
    },
    songIsPlaying: function (index) {
      if (this.$store.state.playIndex === index) {
        return true;
      }
      return false;
    },
    changeSong: function (index) {
      this.changeUrl(index);
      this.$store.commit('playMusic');
    }
  },
  mounted: function () {
    document.addEventListener('click', (e) => {
      if (this.$store.state.showList && this.$refs.listbody.contains(e.target)) {
        return;
      } else {
        this.$store.state.showList = false;
      }
    });
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
