<template>
  <div id="v-singerlists-body">
    <template v-for="item in singerlists">
      <md-card id="v-singerlist-hover" class="v-singerlist-ele" :key="item.id">
        <img :src="item.imgUrl" @click="goToDetail(item)" style="cursor: pointer"/>
        <md-card-media-cover md-solid>
          <md-card-area>
            <md-card-header>
              <div class="md-title"><span @click="goToDetail(item)" style="cursor: pointer;">{{item.name}}</span></div>
            </md-card-header>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'singerlists',
    data () {
      return {
        singerlists: []
      }
    },
    methods: {
      goToDetail: function (item) {
        this.toTop()
        this.$router.push({name: 'details', query: {id: item.id}, params: {id: 1}})
      }
    },
    created () {
      this.singerlists = []
      this.axios.get('http://maxutian.cn:3000/top/artists?limit=9').then(res => {
        res.data.artists.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            imgUrl: item.img1v1Url
          }
          this.singerlists.push(obj)
        })
      })
    }
  }
</script>

<style>
  #v-singerlists-body{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 50%;
    margin: 0 auto;
    margin-top: 150px;
    margin-bottom: 60px;
    padding-left: 2%;
  }
  #v-singerlist-hover{
    transition:all .4s cubic-bezier(.25,.8,.25,1);
    transition-property:box-shadow;
  }
  #v-singerlist-hover:hover{
    z-index:2;
    box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);
  }
  .v-singerlist-ele{
    width: 30%;
    margin-bottom: 3%;
    margin-right: 3%;
  }
</style>
