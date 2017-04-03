<template>
  <div id="v-player-container">
    <audio src=""></audio>
    <div id="v-player-control">
      <md-button class="md-icon-button v-player-pre" style="width: 50px;height: 50px">
        <md-icon class="v-player-pn" id="previous">skip_previous</md-icon>
      </md-button>
      <md-button class="md-icon-button" style="width: 65px;height: 65px">
        <md-icon class="md-size-2x" id="play-pause">play_circle_outline</md-icon>
      </md-button>
      <md-button class="md-icon-button v-player-next" style="width: 50px;height: 50px">
        <md-icon class="v-player-pn" id="next">skip_next</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>

</script>

<style>
  #v-player-container{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90px;
    background-color: #06a2e5;
    box-shadow: 0 -5px 15px 2px rgba(0, 0, 0, 0.2);
  }
  #v-player-control{
    display: flex;
    align-items: center;
  }
  .v-player-pn{
    width: 35px !important;
    min-width: 35px !important;
    height: 35px !important;
    min-height: 35px !important;
    font-size: 35px !important;
  }
  .v-player-pre{
    margin-right: -10px !important;
  }
  .v-player-next{
    margin-left: -10px !important;
  }
</style>
