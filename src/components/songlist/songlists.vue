<template>
	<div id="v-songlists-body">
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
		<songlsit></songlsit>
	</div>
</template>

<script>
import songlsit from './songlist.vue';

export default {
  components: {
    songlsit
  }
};
</script>

<style>
	#v-songlists-body{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		width: 50%;
		margin: 0 auto;
		margin-top: 30px;
	}
</style>
