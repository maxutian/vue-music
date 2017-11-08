import Vue from 'vue'

Vue.filter('timeToStr', time => {
  let min = Number.parseInt(time / 60, 10) + ''
  let seconds = Number.parseInt(time % 60, 10) + ''
  min = min < 10 ? ('0' + min) : min
  seconds = seconds < 10 ? ('0' + seconds) : seconds
  return min + ':' + seconds
})

Vue.filter('playCountFormat', playCount => {
  return playCount < 100000 ? playCount : Math.floor(playCount / 10000) + '万'
})
