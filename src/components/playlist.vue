<template>
  <transition name="showlist">
    <div id="v-playlist" v-if="(this.$store.state.showList)" ref="listbody">
      <div class="v-playlist-tabbar">
        <span style="width: 40px;"></span>
        <div class="v-playlist-title">
          <span>播放列表</span>
        </div>
        <button class="v-playlist-close" style="margin-right: 5px;" @click="showList">
          <i class="material-icons" style="font-size: 1em;margin-top: 3px;">close</i>
        </button>
      </div>
      <md-list>
        <md-list-item class="v-detail-items v-playlist-items">
          <md-ink-ripple />
          <md-icon class="v-detail-icon">play_arrow</md-icon><span>song1</span>
          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </md-list>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'playlist',
  data () {
    return {
    };
  },
  methods: {
    showList: function () {
      this.$store.state.showList = !this.$store.state.showList;
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (this.$store.state.showList === true && this.$refs.listbody.contains(e.target)) {
        return;
      } else {
        this.$store.state.showList = false;
      }
    });
  }
};
</script>

<style>
  #v-playlist{
    z-index: 998;
    position: fixed;
    right: 0;
    bottom: 90px;
    width: 40%;
    height: 60%;
    background-color: #fff;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px rgba(0,0,0,.14), 0 1px 18px rgba(0,0,0,.12);
  }
  .v-playlist-tabbar{
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    position: relative;
    top: 0;
    width: 100%;
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
  .v-playlist-close{
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    border-radius: 50%;
  }
  .v-playlist-close:hover{
    background-color: rgba(142,138,138,.5);
    transition: all .3s ease-out;
  }
  .v-playlist-items{
    width: 98%;
    margin: 0 auto;
  }
  .showlist-enter,.showlist-leave-active{
    opacity: 0;
    transform: translateX(40%);
  }
  .showlist-enter-active,.showlist-leave-active{
    transition: all .3s cubic-bezier(.69,.01,.04,1.17);
  }
</style>
