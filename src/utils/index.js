export default{
  install (Vue, options) {
    Vue.prototype.changeUrl = function (index) {
      this.axios.get('http://maxutian.cn:3000/music/url?id=' + this.$store.state.songList[index].id).then(res => {
        if (res.data.data[0].url === null) {
          alert('Sorry,该音乐暂时无法播放')
          this.changeUrl(index + 1)
          return
        }
        this.$store.state.mp3Url = res.data.data[0].url
        this.$store.state.playIndex = index
      })
    }
    Vue.prototype.toTop = function () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
