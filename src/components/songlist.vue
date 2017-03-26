<template>
	<!-- <md-layout md-gutter md-align="center" id="v-songlist-body">
		<md-layout md-tag="md-card" md-flex="33" id="v-songlist-hover">
			  
		</md-layout>
	</md-layout> -->
	<div id="v-songlist-body">
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
		<singlelist></singlelist>
	</div>
</template>

<script>
import singlelist from './singlelist.vue';

export default {
  components: {
    singlelist
  }
};
</script>

<style>
	#v-songlist-body{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		width: 60%;
		margin: 0 auto;
		margin-top: 30px;
	}
</style>
