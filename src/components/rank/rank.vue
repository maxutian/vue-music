<template>
	<md-card id="v-rank-hover" class="v-rank-ele">
		<md-card-media-cover md-solid>
	    <md-card-media md-ratio="3:1">
	      <img src="../../assets/billboard-logo.jpg" alt="Skyscraper">
	    </md-card-media>

	    <md-card-area>
	      <md-card-header>
	        <div class="md-title">Billboard</div>
	      </md-card-header>
	    </md-card-area>

	  </md-card-media-cover>
	</md-card>
</template>

<script>
	
</script>

<style>
	#v-rank-hover{
		cursor: pointer;
		transition: all .4s cubic-bezier(.25,.8,.25,1);
		transition-property: box-shadow;
	}
	#v-rank-hover:hover{
		z-index: 2;
		box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);
	}
	.v-rank-ele{
		width: 100%;
		margin-bottom: 3%;
	}
</style>
