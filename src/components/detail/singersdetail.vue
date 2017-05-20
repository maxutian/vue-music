<template>
  <md-list id="v-singerdetail-container">
    <div class="detail-header">
      <div>
        <img :src="singerUrl" class="v-detail-avatarUrl">
      </div>
      <div class="v-detail-singername">
        <span>{{singerName}}</span>
      </div>
      <div class="v-detail-alias">
        <span>{{alias}}</span>
      </div>
    </div>
    <div style="margin-top: 10px">
      <template v-for="item in singerdetails">
        <md-list-item class="v-detail-items">
          <md-ink-ripple />
          <md-icon class="v-detail-icon">play_arrow</md-icon>
          <div><span style="color: #e9382a;font-weight: 500;">{{item.name}}</span></div>
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
    name: 'singerdetail',
    data () {
      return {
        singerdetails: [],
        singerUrl: '',
        singerName: '',
        alias: ''
      };
    },
    mounted () {
      this.singerdetails = [];
      this.axios.get('http://localhost:3000/artists?id=' + this.$route.query.id).then(res => {
        this.singerUrl = res.data.artist.picUrl;
        this.singerName = res.data.artist.name;
        this.alias = res.data.artist.alias[0];
        res.data.hotSongs.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            duration: Vue.options.filters.timeToStr(item.dt / 1000)
          };
          this.singerdetails.push(obj);
        });
      });
    }
  };
</script>

<style>
  #v-singerdetail-container{
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
  .v-detail-singername{
    position: absolute;
    top: 30px;
    left: 280px;
    font-weight: 500;
    font-size: 2.5em;
  }
  .v-detail-alias{
    position: absolute;
    top: 70px;
    left: 285px;
    font-weight: 300;
    font-size: 1.3em;
  }
</style>
