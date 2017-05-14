<template>
	<div id="v-ranks-body">
		<rank></rank>
		<rank></rank>
		<rank></rank>
	</div>
</template>

<script>
import rank from './rank';

export default {
  components: {
    rank
  }
};
</script>

<style>
	#v-ranks-body{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		margin-bottom: 90px;
	}
</style>
