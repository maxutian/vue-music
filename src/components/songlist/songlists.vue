<template>
  <div id="v-songlists-body">
    <template v-for="item in songlists">
      <md-card id="v-songlist-hover" class="v-songlist-ele" @click.native="$router.push('detail')">
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="1:1">
            <img :src="item.imgUrl">
          </md-card-media>
          <md-card-area>
            <md-card-header>
              <div class="md-title">{{item.name}}</div>
              <div class="md-subhead">{{formatCount(item.playCount)}}</div>
            </md-card-header>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'songlists',
    data () {
      return {
        songlists: []
      };
    },
    mounted () {
      this.songlists = [];
      this.axios.get('http://localhost:3000/top/playlists/highquality?limit=9').then(res => {
        res.data.playlists.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            imgUrl: item.coverImgUrl,
            playCount: item.playCount
          };
          this.songlists.push(obj);
        });
      });
    },
    methods: {
      formatCount (count) {
        return count < 100000 ? count : `${Math.floor(count / 10000)}万`;
      }
    }
  };
</script>

<style>
  #v-songlists-body{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 50%;
    margin: 0 auto;
    margin-top: 150px;
    margin-bottom: 90px;
    padding-left: 2%;
  }
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
    margin-right: 3%;
  }
  @media(max-width: 1000px){
    .v-songlist-ele{
      width: 45%;
      margin-bottom: 5%;
      margin-right: 5%;
    }
  }
</style>
