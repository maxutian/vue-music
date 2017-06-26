<template>
  <md-list id="v-songdetail-container">
    <transition name="loadAnimation">
      <div class="animation-container" v-if="isloading">
        <div class="dots-container">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>
      </div>
    </transition>
    <div class="detail-header">
      <div>
        <img :src="avatarUrl" class="v-detail-avatarUrl">
      </div>
      <div class="creator">
        <span>Created By :</span>
      </div>
      <div class="v-detail-nickname">
        <span>{{nickname}}</span>
      </div>
      <div class="v-detail-signature">
        <span>{{signature}}</span>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <template>
        <md-list-item v-for="(item, index) in details" :key="item.id" 
                      class="v-detail-items" 
                      @click.native="changeIcon(), changeUrl(index)">
          <md-ink-ripple />
          <md-icon class="v-detail-icon">play_arrow</md-icon>
          <div><span style="color: #e9382a;font-weight: 500;">{{item.name}}</span> / {{item.arname}}</div>
          <div>{{item.duration}}</div>
          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </template>
    </div>
  </md-list>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'detail',
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
      showContent: function () {
        this.isloading = false;
      },
      changeIcon: function () {
        this.$store.commit('playMusic');
      },
      changeUrl: function (index) {
        this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.details[index].id).then(res => {
          if (res.data.data[0].url === null) {
            alert('Sorry,该音乐暂时无法播放');
            return;
          }
          for (let item in this.$store.state.songList) {
            if (this.$store.state.songList[item].id === this.details[index].id) {
              this.$store.state.playIndex = parseInt(item);
              this.$store.state.mp3Url = res.data.data[0].url;
              return;
            }
          }
          this.$store.commit('addSong', this.details[index]);
          this.$store.state.mp3Url = res.data.data[0].url;
          this.$store.state.playIndex = 0;
        });
      }
    },
    mounted () {
      setTimeout(this.showContent, 2000);
      this.details = [];
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
    }
  };
</script>

<style scoped>
  #v-songdetail-container{
    z-index: 1;
    position: relative;
    width: 50%;
    margin: 0 auto;
    margin-top: 230px;
    margin-bottom: 120px;
    padding-top: 0;
    padding-bottom: 30px;
    padding-right: 5px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
  }
</style>
