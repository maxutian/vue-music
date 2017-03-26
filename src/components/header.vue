<template>
	<div id="header-container">
		<md-toolbar>
		  <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
		    <md-icon>menu</md-icon>
		    <md-tooltip md-direction="bottom">歌曲列表</md-tooltip>
		  </md-button>
		  <h2 class="md-title">Vue Music</h2>
		  <md-input-container md-inline id="v-header-inputContainer">
		    <md-input placeholder="输入歌曲名以搜索" id="v-header-input"></md-input>
		  </md-input-container>
		  <md-button class="md-icon-button">
		  	<md-icon>search</md-icon>
		  	<md-tooltip md-direction="bottom">搜索歌曲</md-tooltip>
		  </md-button>
		  <span style="flex: 1"></span>
		  <md-button class="md-icon-button">
		  	<md-icon>home</md-icon>
		  	<md-tooltip md-direction="left">返回博客主页</md-tooltip>
		  </md-button>
		</md-toolbar>

		<md-sidenav class="md-left" ref="sidenav">
	    <md-toolbar class="md-large">
	      <md-list class="md-transparent">
	      	<md-list-item class="md-avatar-list">
	      		<md-avatar class="md-large" id="v-header-avatar">
	      			<img src="https://placeimg.com/64/64/people/3" alt="People">
	      		</md-avatar>
	      	</md-list-item>
	      	<md-list-item>
	      		<span class="md-title">User Name</span>
	      	</md-list-item>
	      </md-list>
	    </md-toolbar>
	    <md-list>
      	<md-subheader>Song List</md-subheader>
		    <md-list-item @click.native="$refs.sidenav.toggle()" class="md-primary">
		    	<md-icon class="v-header-sidenav-icon">play_arrow</md-icon><span>song1</span>
		    	<md-divider class="md-inset"></md-divider>
		    </md-list-item>
		    <md-list-item @click.native="$refs.sidenav.toggle()">
		    	<md-icon class="v-header-sidenav-icon">play_arrow</md-icon><span>song1</span>
		    	<md-divider class="md-inset"></md-divider>
		    </md-list-item>
		    <md-list-item @click.native="$refs.sidenav.toggle()">
		    	<md-icon class="v-header-sidenav-icon">play_arrow</md-icon><span>song1</span>
		    	<md-divider class="md-inset"></md-divider>
		    </md-list-item>
	    </md-list>
	  </md-sidenav>
	</div>
</template>

<script>
	export default {
  methods: {
	    toggleLeftSidenav () {
	      this.$refs.sidenav.toggle();
	    }
	  }
	};
</script>

<style>
/*v-header-sidenav css*/

	.v-header-sidenav-icon {
		margin-right: 10px !important;
		margin-left: -10px !important;
	}
	.md-inset {
		margin-left: 40px !important;
	}
	#v-header-avatar {
		margin-top: 20px;
		margin-left: 10px;
	}

/*v-header-header css*/

	#v-header-inputContainer {
		width: 12%;
		margin-left: 4%;
	}
	#v-header-input {
		margin-top: 5px;
	}
	#v-header-input::placeholder {
		font-size: 13px;
		color: grey;
	}
</style>
