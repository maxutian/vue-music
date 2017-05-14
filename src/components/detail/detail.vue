<template>
	<md-list id="v-detail-container">
    <md-list-item>
    	<md-icon class="v-detail-icon">play_arrow</md-icon><span>song1</span>
    	<md-divider class="md-inset"></md-divider>
    </md-list-item>
    <md-list-item>
    	<md-icon class="v-detail-icon">play_arrow</md-icon><span>song2</span>
    	<md-divider class="md-inset"></md-divider>
    </md-list-item>
    <md-list-item>
    	<md-icon class="v-detail-icon">play_arrow</md-icon><span>song3</span>
    	<md-divider class="md-inset"></md-divider>
    </md-list-item>
  </md-list>
</template>

<script>
	
</script>

<style>
	#v-detail-container{
		z-index: 1;
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		padding-bottom: 30px;
		padding-right: 10px;
		box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
	}
	.v-detail-icon{
		margin-right: 10px !important;
	}
	.md-divider{
		margin-left: 20px !important;
	}
</style>
