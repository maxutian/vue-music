import Vue from 'vue';
import Router from 'vue-router';
import songlists from '../components/songlist/songlists';
import singerlists from '../components/singerlist/singerlists';
import ranks from '../components/rank/ranks';
import songlistsdetail from '../components/detail/songlistsdetail';
import singersdetail from '../components/detail/singersdetail';
import ranksdetail from '../components/detail/ranksdetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'songlists',
      component: songlists
    },
    {
      path: '/singerlists',
      name: 'singerlists',
      component: singerlists
    },
    {
      path: '/ranks',
      name: 'ranks',
      component: ranks
    },
    {
      path: '/songlistsdetail',
      name: 'songlistsdetail',
      component: songlistsdetail
    },
    {
      path: '/singersdetail',
      name: 'singersdetail',
      component: singersdetail
    },
    {
      path: '/ranksdetail',
      name: 'ranksdetail',
      component: ranksdetail
    }
  ]
});
