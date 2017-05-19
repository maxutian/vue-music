<template>
  <md-list id="v-songdetail-container">
    <div class="detail-header">
      <div>
        <img :src="avatarUrl" class="v-detail-avatarUrl">
      </div>
      <div class="creator">
        <span>created by:</span>
      </div>
      <div class="v-detail-nickname">
        <span>{{nickname}}</span>
      </div>
      <div class="v-detail-signature">
        <span>{{signature}}</span>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <template v-for="item in details">
        <md-list-item>
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
        signature: ''
      };
    },
    mounted () {
      this.details = [];
      this.axios.get('http://localhost:3000/playlist/detail?id=' + this.$route.query.id).then(res => {
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

<style>
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
