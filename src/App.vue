<template>
  <div id="app">
    <v-header></v-header>  
    <v-tabbar></v-tabbar>
    <router-view></router-view>
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
  
</style>
