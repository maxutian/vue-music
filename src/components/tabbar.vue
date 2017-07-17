<template>
  <div id="v-tabbar">
    <button id="goback" @click="goBack()">
      <i class="material-icons"><md-ink-ripple/>arrow_back</i>
      <md-tooltip md-direction="bottom">返回</md-tooltip>
    </button>
    <md-button class="v-tab" @click.native="$router.push('/'),listActive()">
      <div :class="{'v-tabbar-active': this.$store.state.tabbarIndex === 0}">歌单</div>
    </md-button>
    <md-button class="v-tab" @click.native="$router.push('singerlists'),singerActive()">
      <div :class="{'v-tabbar-active': this.$store.state.tabbarIndex === 1}">歌手</div>
    </md-button>
    <md-button class="v-tab" @click.native="$router.push('ranks'),rankActive()">
      <div :class="{'v-tabbar-active': this.$store.state.tabbarIndex === 2}">排行榜</div>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  methods: {
    listActive: function () {
      this.$store.commit('listActive');
    },
    singerActive: function () {
      this.$store.commit('singerActive');
    },
    rankActive: function () {
      this.$store.commit('rankActive');
    },
    goBack: function () {
      this.$router.go(-1);
    }
  }
};
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
.v-tab{
  width: 15%;
  height: 48px;
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1.1em;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
}
#goback{
  z-index: 999;
  cursor: pointer;
  position: fixed;
  top: 85px;
  left: 2%;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  transition: all .3s ease;
}
#goback:hover{
  background-color: rgba(200,200,200,.6);
  transition: all .3s ease;
}
.v-tabbar-active{
  height: 48px;
  color: #e9382a;
  padding-top: 3px !important;
  font-size: 1.2em;
  font-weight: 600;
  border-bottom: 3px solid #e9382a;
}
</style>
