<template>
	<md-tabs md-fixed md-elevation="2" md-theme="tabbar">
	  <md-tab id="songlist" md-label="歌单">
	  	<songlist></songlist>
	  </md-tab>
	  <md-tab id="singer" md-label="歌手">
	  </md-tab>
	  <md-tab id="charts" md-label="排行榜">
	  </md-tab>
	</md-tabs>
</template>

<script>
import songlist from './songlist.vue';

export default {
  components: {
    songlist
  }
};
</script>

<style>
</style>
