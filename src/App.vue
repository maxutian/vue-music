<template>
  <div id="app">
    <v-header></v-header>  
    <tabbar></tabbar>
    <router-view></router-view>
    <playlist :style="this.$store.state.listDisplay"></playlist>
    <player></player>
  </div>
</template>

<script>
  import header from './components/header';
  import tabbar from './components/tabbar';
  import player from './components/player';
  import playlist from './components/playlist';

  export default {
    data () {
      return {
      };
    },
    components: {
      'v-header': header,
      'tabbar': tabbar,
      'player': player,
      'playlist': playlist
    }
  };
</script>

<style>
  
</style>
