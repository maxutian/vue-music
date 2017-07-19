import Vue from 'vue';
import Router from 'vue-router';
import songlists from '../components/songlist/songlists';
import singerlists from '../components/singerlist/singerlists';
import ranks from '../components/rank/ranks';
import details from '../components/detail/details';

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
      path: '/details',
      name: 'details',
      component: details
    }
  ]
});
