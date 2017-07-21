<template>
  <div class="details-container">
    <transition name="loadAnimation">
      <div class="animation-container" v-if="isloading">
        <div class="dots-container">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>
      </div>
    </transition>
    <div class="v-songdetail-header">
      <div>
        <img :src="avatarUrl" class="v-detail-avatarUrl">
      </div>
      <div class="creator" v-if="this.$route.params.id === 0">
        <span>Created By :</span>
      </div>
      <div class="v-detail-nickname">
        <span>{{nickname}}</span>
      </div>
      <div class="v-detail-signature">
        <span>{{signature}}</span>
      </div>
    </div>
    <div class="v-songdetail-funcArea">
      <md-button class="playAllBtn" @click.native="playAll">
        <md-icon>play_circle_outline</md-icon>
        <div style="width: 10px;"></div>
        <p style="font-weight: 600;">播放全部</p>
      </md-button>

      <div class="songCount">共<p>{{details.length}}</p>首</div>
    </div>
    <md-list class="v-songdetail-content">
      <template>
        <md-list-item v-for="(item, index) in details" :key="item.id" 
                      class="v-detail-items" 
                      @click.native="changeUrl(index)">
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
    name: 'details',
    data () {
      return {
        details: [],
        avatarUrl: '',
        nickname: '',
        signature: '',
        isloading: true
      };
    },
    methods: {
      playAll: function () {
        this.$store.commit('clearList');
        for (let item in this.details) {
          this.$store.commit('pushSong', this.details[item]);
        }
        this.changeSong(0);
        this.$store.commit('playMusic');
      },
      showContent: function () {
        this.isloading = false;
      },
      changeUrl: function (index) {
        this.$store.commit('addSong', this.details[index]);
        if (this.$store.state.isRepeating) {
          this.changeSong(index);
          this.$store.commit('playMusic');
          this.$store.state.isRepeating = false;
          return;
        }
        this.changeSong(0);
        this.$store.commit('playMusic');
      }
    },
    mounted () {
      this.details = [];
      if (this.$route.params.id === 0) {
        setTimeout(this.showContent, 2000);
        this.axios.get('http://maxutian.cn:3000/playlist/detail?id=' + this.$route.query.id).then(res => {
          this.avatarUrl = res.data.playlist.creator.avatarUrl;
          this.nickname = res.data.playlist.creator.nickname;
          this.signature = res.data.playlist.creator.signature;
          res.data.playlist.tracks.forEach(item => {
            let obj = {
              name: item.name,
              id: item.id,
              arname: item.ar[0].name,
              duration: Vue.options.filters.timeToStr(item.dt / 1000)
            };
            this.details.push(obj);
          });
        });
      } else if (this.$route.params.id === 1) {
        setTimeout(this.showContent, 1000);
        this.axios.get('http://maxutian.cn:3000/artists?id=' + this.$route.query.id).then(res => {
          this.avatarUrl = res.data.artist.picUrl;
          this.nickname = res.data.artist.name;
          this.signature = res.data.artist.alias[0];
          res.data.hotSongs.forEach(item => {
            let obj = {
              name: item.name,
              id: item.id,
              arname: res.data.artist.name,
              duration: Vue.options.filters.timeToStr(item.dt / 1000)
            };
            this.details.push(obj);
          });
        });
      } else if (this.$route.params.id === 2) {
        setTimeout(this.showContent, 1000);
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
            this.details.push(obj);
          });
        });
      } else {
        return;
      }
    }
  };
</script>

<style scoped>
  .v-songdetail-header{
    z-index: 1;
    position: relative;
    width: 50%;
    margin: 0 auto;
    margin-top: 230px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  }
  .v-songdetail-funcArea{
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
    display: flex;
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
  .v-songdetail-content{
    z-index: 1;
    position: relative;
    width: 50%;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 120px;
    padding-top: 0;
    padding-bottom: 30px;
    padding-right: 5px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
  }
</style>
