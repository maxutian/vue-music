<template>
	<md-card id="v-songlist-hover" class="v-songlist-ele">
		<md-card-media-cover md-solid>
	    <md-card-media md-ratio="1:1">
	      <img src="../../assets/album.jpg" alt="Skyscraper">
	    </md-card-media>

	    <md-card-area>
	      <md-card-header>
	        <div class="md-title">Title goes here</div>
	        <div class="md-subhead">1次播放</div>
	      </md-card-header>
	    </md-card-area>

	  </md-card-media-cover>
	</md-card>
</template>

<script>
	
</script>

<style>
	#v-songlist-hover{
		cursor: pointer;
		transition: all .4s cubic-bezier(.25,.8,.25,1);
		transition-property: box-shadow;
	}
	#v-songlist-hover:hover{
		z-index: 2;
		box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);
	}
	.v-songlist-ele{
		width: 30%;
		margin-bottom: 3%;
	}
	@media(max-width: 1000px){
		.v-songlist-ele{
			width: 45%;
		}
	}
</style>
