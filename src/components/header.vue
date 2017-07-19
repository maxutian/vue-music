<template>
  <div id="header-container">
    <md-toolbar>

      <h2 class="md-title header-title" 
          @click="$router.push('/'),test()" 
          style="cursor: pointer">Vue Music</h2>
      <md-input-container md-inline id="v-header-inputContainer">
        <md-input placeholder="输入歌曲名以搜索" id="v-header-input"></md-input>
      </md-input-container>
      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
        <md-tooltip md-direction="bottom">搜索歌曲</md-tooltip>
      </md-button>
      <span style="flex: 1"></span>
      <md-button class="md-icon-button" @click.native="toBlog()">
        <md-icon>home</md-icon>
        <md-tooltip md-direction="left">返回博客主页</md-tooltip>
      </md-button>
      
    </md-toolbar>

  </div>
</template>

<script>
export default {
  methods: {
    test: function () {
      this.$store.commit('listActive');
    },
    toBlog: function () {
      window.open('http://maxutian.cn');
    }
  }
};
</script>

<style>
  #header-container{
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .header-title{
    margin-left: 2% !important;
    font-size: 2em !important;
    font-weight: 900 !important;
  }

/*v-header-header css*/

  #v-header-inputContainer {
    width: 12%;
    margin-left: 3%;
  }
  #v-header-input {
    margin-top: 5px;
  }
  #v-header-input::placeholder {
    font-size: 13px;
    color: grey;
  }
</style>
