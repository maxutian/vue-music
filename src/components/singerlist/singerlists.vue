<template>
	<div id="v-singerlists-body">
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
		<singerlist></singerlist>
	</div>
</template>

<script>
	import singerlist from './singerlist';

export default {
  components: {
    singerlist
  }
};
</script>

<style>
	#v-singerlists-body{
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		width: 50%;
		margin: 0 auto;
		margin-top: 10px;
	}
</style>
