<template>
	<md-tabs md-fixed md-elevation="2" md-theme="tabbar">
	  <md-tab id="songlists" md-label="歌单">
	  	<songlists></songlists>
	  </md-tab>
	  <md-tab id="singer" md-label="歌手">
	  	<singerlists></singerlists>
	  </md-tab>
	  <md-tab id="charts" md-label="排行榜">
	  	<ranks></ranks>
	  </md-tab>
	</md-tabs>
</template>

<script>
import songlists from './songlist/songlists';
import singerlists from './singerlist/singerlists';
import ranks from './rank/ranks';

export default {
  components: {
    songlists,
    singerlists,
    ranks
  }
};
</script>

<style>
</style>
