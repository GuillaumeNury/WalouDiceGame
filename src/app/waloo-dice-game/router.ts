import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import PageNotFound from './components/PageNotFound.vue';
import Rules from './components/Rules.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/rules', name: 'rules', component: Rules },
    { path: '*', name: '404', component: PageNotFound },
  ],
});
