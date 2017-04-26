<template>
  <div id="v-player-container">
    <audio src="../assets/Oasis - Supersonic.mp3" id="v-player-music"></audio>
    <div id="v-player-control">
      <button @click="" class="v-player-pre">
        <i class="material-icons" id="previous">skip_previous</i>
        <md-tooltip md-direction="top">上一首</md-tooltip>
      </button>
      <button @click="changeIcon" class="play-pause">
        <i class="material-icons" id="play-pause-icon">play_circle_outline</i>
        <md-tooltip md-direction="top" id="play-pause-text">播放</md-tooltip>
      </button>
      <button @click="" class="v-player-next">
        <i class="material-icons" id="next">skip_next</i>
        <md-tooltip md-direction="top">下一首</md-tooltip>
      </button>
    </div>
    <div id="v-player-duration">
      <div id="pointer" @mousedown="Drag">
        <div id="pointer-s"></div>
      </div>
      <div id="duration-bg">
        <div id="progress-bar"></div>
      </div>
    </div>
    <button class="v-player-voice" @click="volumeControl">
      <i class="material-icons" id="voice">volume_up</i>
      <md-tooltip md-direction="top">音量/静音</md-tooltip>
    </button>
    <div id="v-volume-duration">
      <div id="v-pointer">
        <div id="v-pointer-s"></div>
      </div>
      <div id="duration-bg">
        <div id="v-progress-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player',
  methods: {
    changeIcon () {
      var ppi = document.getElementById('play-pause-icon');
      var ppt = document.getElementById('play-pause-text');
      var audio = document.getElementById('v-player-music');
      if (ppi.innerHTML === 'play_circle_outline') {
        ppi.innerHTML = 'pause_circle_outline';
        ppt.innerHTML = '暂停';
        audio.pause();
      } else {
        ppi.innerHTML = 'play_circle_outline';
        ppt.innerHTML = '播放';
        audio.play();
      }
    },
    volumeControl () {
      var voice = document.getElementById('voice');
      if (voice.innerHTML === 'volume_up') {
        voice.innerHTML = 'volume_off';
      } else {
        voice.innerHTML = 'volume_up';
      }
    },
    Drag () {
      var scroll = document.getElementById('v-player-duration');
      var bar = document.getElementById('pointer');
      var mask = document.getElementById('progress-bar');
      var bgWidth = document.getElementById('duration-bg');
      var barleft = 0;
      bar.onmousedown = function () {
        var event = event || window.event;
        var leftVal = event.clientX - this.offsetLeft;
        var that = this;
        document.onmousemove = function () {
          var event = event || window.event;
          barleft = event.clientX - leftVal;
          if (barleft < 0) {
            barleft = 0;
          } else if (barleft > scroll.offsetWidth - bar.offsetWidth) {
            barleft = scroll.offsetWidth - bar.offsetWidth;
          }
          mask.style.width = (barleft / bgWidth.offsetWidth) * 100 + '%';
          that.style.left = (barleft / bgWidth.offsetWidth) * 100 + '%';
          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        };
        document.onmouseup = function () {
          document.onmousemove = null;
        };
      };
    }
  },
  mouted: function () {
  }
};
</script>

<style>
  .play-pause:hover,.v-player-pre:hover,.v-player-next:hover,.v-player-voice:hover{
    background-color: rgba(142,138,138,.5);
    transition: all .3s ease-out;
  }
  #v-player-container{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90px;
    background-color: #06a2e5;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.3);
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
    display: flex;
    align-items: center;
    position: relative;
    left: 1%;
    width: 63%;
  }
  #duration-bg{
    cursor: pointer;
    width: 100%;
    height: 5px;
    border-radius: 2px;
    background-color: rgba(142,138,138,.7);
  }
  #progress-bar{
    width: 10%;
    height: 5px;
    border-radius: 2px;
    background-color: #e9382a;
  }
  #pointer{
    z-index: 2;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 10%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: white;
  }
  #pointer:hover{
    box-shadow: 0 0 0 5px rgba(229,229,229,.3);
    transition: all .3s ease-out;
  }
  #pointer-s{
    z-index: 2;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #e9382a;
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
  #v-progress-bar{
    width: 20%;
    height: 5px;
    border-radius: 2px;
    background-color: #e9382a;
  }
  #v-volume-duration{
    display: flex;
    align-items: center;
    width: 8%;
    margin-left: -0.5%;
  }
  #v-pointer{
    z-index: 2;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 20%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: white;
  }
  #v-pointer:hover{
    box-shadow: 0 0 0 5px rgba(229,229,229,.3);
    transition: box-shadow .3s ease-out;
  }
  #v-pointer-s{
    z-index: 2;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #e9382a;
  }
</style>
