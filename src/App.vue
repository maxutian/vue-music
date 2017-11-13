<template>
  <div id="app">
    <v-header></v-header>  
    <tabbar></tabbar>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
  import header from './components/header'
  import tabbar from './components/tabbar'
  import player from './components/player'

  export default {
    data () {
      return {
      }
    },
    components: {
      'v-header': header,
      'tabbar': tabbar,
      'player': player
    }
  }
</script>

<style>
  
</style>
