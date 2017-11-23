<template>
  <div id="v-ranks-body">
    <md-card id="v-rank-hover" class="v-rank-ele" @click.native="goToDetail()">
      <md-card-media-cover md-solid>
        <progressive-img src="../../../static/billboard-logo.jpg" alt="billboard-logo.jpg" style="cursor: pointer"/>
        <md-card-area>
          <md-card-header>
            <div class="md-title">Billborad公告牌</div>
          </md-card-header>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      goToDetail: function () {
        this.toTop()
        this.$router.push({name: 'details', query: {id: 'billborad'}, params: {id: 2}})
      }
    }
  }
</script>

<style>
  #v-ranks-body{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 40%;
    margin: 0 auto;
    margin-top: 150px;
    margin-bottom: 90px;
  }
  #v-rank-hover{
    cursor: pointer;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    transition-property: box-shadow;
  }
  #v-rank-hover:hover{
    z-index: 2;
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);
  }
  .v-rank-ele{
    width: 100%;
    margin-bottom: 3%;
  }
</style>
