import Vue from 'vue';
import Router from 'vue-router';
import detail from '../components/detail/detail';
import songlists from '../components/songlist/songlists';
import singerlists from '../components/singerlist/singerlists';
import ranks from '../components/rank/ranks';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/songlists',
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
    }
  ]
});
