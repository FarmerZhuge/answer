import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/components/main')
  },
  {
    path: '/admin',
    component: () => import('@/components/admin') 
  },
  {
    path: '/user',
    component: () => import('@/components/user') 
  },
];

var router =  new VueRouter({
  routes
})

export default router;