<template>
  <div id="v-player-container">
    <audio src=""></audio>
    <div id="v-player-control">
      <button @click="" class="v-player-pre">
        <i class="material-icons" id="previous">skip_previous</i>
      </button>
      <button @click="changeIcon" class="play-pause">
        <i class="material-icons" id="play-pause-icon">pause_circle_outline</i>
      </button>
      <button @click="" class="v-player-next">
        <i class="material-icons" id="next">skip_next</i>
      </button>
    </div>
    <div id="v-player-duration">
      <md-progress class="md-accent" :md-progress="progress"></md-progress>
    </div>
    <button class="v-player-voice" @click="volumeControl">
      <i class="material-icons" id="voice">volume_up</i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    changeIcon () {
      var ppi = document.getElementById('play-pause-icon');
      if (ppi.innerHTML === 'play_circle_outline') {
        ppi.innerHTML = 'pause_circle_outline';
      } else {
        ppi.innerHTML = 'play_circle_outline';
      }
    },
    volumeControl () {
      var voice = document.getElementById('voice');
      if (voice.innerHTML === 'volume_up') {
        voice.innerHTML = 'volume_off';
      } else {
        voice.innerHTML = 'volume_up';
      }
    }
  }
};
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
    box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.3);
  }
  #v-player-control{
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .play-pause{
    cursor: pointer;
    width: 65px;
    height: 65px;
    margin-top: -3px;
    background-color: transparent;
    border: none;
    border-radius: 50%;
  }
  #play-pause-icon{
    font-size: 4em;
    margin-top: 3px;
  }
  .v-player-pre,.v-player-next{
    cursor: pointer;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    border-radius: 50%;
  }
  #previous,#next{
    font-size: 3em;
  }
  #v-player-duration{
    width: 60%;
    margin-left: 2%;
  }
  .v-player-voice{
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    margin-left: 2%;
  }
  #voice{
    font-size: 2em;
  }
  .play-pause:hover,.v-player-pre:hover,.v-player-next:hover,.v-player-voice:hover{
    background-color: rgba(142,138,138,.5);
  }
</style>
