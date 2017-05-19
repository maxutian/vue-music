<template>
	<div id="v-tabbar">
		<md-button id="choice-1" @click.native="$router.push('/')">歌单</md-button>
		<md-button id="choice-2" @click.native="$router.push('singerlists')">歌手</md-button>
		<md-button id="choice-3" @click.native="$router.push('ranks')">排行榜</md-button>
	</div>
</template>

<script>

</script>

<style>
#v-tabbar{
	z-index: 3;
	display: flex;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 80px;
	width: 100%;
	height: 48px;
	min-height: 48px;
	background-color: #fff;
	box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
}
#choice-1,#choice-2,#choice-3{
	width: 15%;
	height: 48px;
	margin: 0;
	padding: 0;
	font-size: 1.1em;
	font-weight: 500;
	text-align: center;
	line-height: 48px;
}
</style>
