<template>
  <div class="ranksdetail-container">
    <transition name="loadAnimation">
      <div class="animation-container" v-if="isloading">
        <div class="dots-container">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>
      </div>
    </transition>
    <div class="v-ranksdetail-header">
      <div>
        <img :src="avatarUrl" class="v-detail-avatarUrl">
      </div>
      <div class="v-detail-nickname">
        <span>{{nickname}}</span>
      </div>
      <div class="v-detail-signature">
        <span>{{signature}}</span>
      </div>
    </div>
    <div class="v-ranksdetail-funcArea">
      <md-button class="playAllBtn" @click.native="playAll">
        <md-icon>play_circle_outline</md-icon>
        <div style="width: 10px;"></div>
        <p style="font-weight: 600;">播放全部</p>
      </md-button>

      <div class="songCount">共<p>{{rankdetails.length}}</p>首</div>
    </div>
    <md-list class="v-ranksdetail-content">
      <template>
        <md-list-item v-for="(item, index) in rankdetails" :key="item.id" 
                      class="v-detail-items" 
                      @click.native="changeIcon(), changeUrl(index)">
          <md-ink-ripple />
          <md-icon class="v-detail-icon">play_arrow</md-icon>
          <div><span style="color: #e9382a;font-weight: 500;">{{item.name}}</span> / {{item.arname}}</div>
          <div>{{item.duration}}</div>
          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </template>
    </md-list>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'ranksdetail',
  data () {
    return {
      rankdetails: [],
      avatarUrl: '',
      nickname: '',
      signature: '',
      isloading: true
    };
  },
  methods: {
    playAll: function () {
      this.$store.commit('clearList');
      for (let item in this.rankdetails) {
        this.$store.commit('pushSong', this.rankdetails[item]);
      }
      this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[0].id).then(res => {
        this.$store.state.mp3Url = res.data.data[0].url;
        this.$store.state.playIndex = 0;
        this.$store.commit('playMusic');
      });
    },
    showContent: function () {
      this.isloading = false;
    },
    changeIcon: function () {
      this.$store.commit('playMusic');
    },
    changeUrl: function (index) {
      this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.rankdetails[index].id).then(res => {
        if (res.data.data[0].url === null) {
          alert('Sorry,该音乐暂时无法播放');
          return;
        }
        for (let item in this.$store.state.songList) {
          if (this.$store.state.songList[item].id === this.rankdetails[index].id) {
            this.$store.state.playIndex = parseInt(item);
            this.$store.state.mp3Url = res.data.data[0].url;
            return;
          }
        }
        this.$store.commit('addSong', this.rankdetails[index]);
        this.$store.state.mp3Url = res.data.data[0].url;
        this.$store.state.playIndex = 0;
      });
    }
  },
  mounted () {
    setTimeout(this.showContent, 600);
    this.rankdetails = [];
    this.axios.get('http://maxutian.cn:3000/top/list?idx=6').then(res => {
      this.avatarUrl = res.data.result.creator.avatarUrl;
      this.nickname = res.data.result.creator.nickname;
      this.signature = res.data.result.creator.signature;
      res.data.result.tracks.forEach(item => {
        let obj = {
          name: item.name,
          id: item.id,
          arname: item.artists[0].name,
          duration: Vue.options.filters.timeToStr(item.duration / 1000)
        };
        this.rankdetails.push(obj);
      });
    });
  }
};
</script>

<style>
  .v-ranksdetail-header{
      z-index: 1;
      position: relative;
      width: 50%;
      margin: 0 auto;
      margin-top: 230px !important;
      box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    }
    .v-ranksdetail-funcArea{
      z-index: 1;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      width: 50%;
      margin: 0 auto;
      margin-top: 10px;
    }
    .md-button{
      margin: 0 !important;
    }
    .playAllBtn{
      display: flex !important;
      flex-flow: row;
      font-size: 1.1em;
    }
    .songCount{
      display: flex;
      flex-flow: row;
      margin-right: 2%;
      font-size: 1.1em;
      font-weight: 600;
    }
    .v-ranksdetail-content{
      z-index: 1;
      position: relative;
      width: 50%;
      margin: 0 auto !important;
      margin-top: 5px !important;
      margin-bottom: 120px !important;
      padding-top: 0 !important;
      padding-bottom: 30px !important;
      padding-right: 5px !important;
      box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    }
</style>
