<template>
  <div id="app">
    <v-header></v-header>  
    <v-tabbar></v-tabbar>
    <div id="empty-space"></div>
    <player></player>
  </div>
</template>

<script>
  import header from './components/header.vue';
  import tabbar from './components/tabbar.vue';
  import player from './components/player.vue';

  export default {
    components: {
      'v-header': header,
      'v-tabbar': tabbar,
      'player': player
    }
  };
</script>

<style>
  #empty-space{
    display: block;
    width: 100%;
    height: 80px;
  }
</style>
