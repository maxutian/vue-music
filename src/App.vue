<template>
  <div id="app">
    <v-header></v-header>  
    <v-tabbar></v-tabbar>
  </div>
</template>

<script>
  import header from './components/header.vue';
  import tabbar from './components/tabbar.vue';

  export default {
    components: {
      'v-header': header,
      'v-tabbar': tabbar
    }
  };
</script>

<style>
</style>
