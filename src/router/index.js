import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Base1View from '../views/Base1View.vue'
import Base2View from '../views/Base2View.vue'
import Base3View from '../views/Base3View.vue'
import Base4View from '../views/Base4View.vue'
import ColladaView from '../views/ColladaView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/base1',
    name: 'base1',
    component: Base1View,
  },
  {
    path: '/base2',
    name: 'base2',
    component: Base2View,
  },
  {
    path: '/base3',
    name: 'base3',
    component: Base3View,
  },
  {
    path: '/base4',
    name: 'base4',
    component: Base4View,
  },
  {
    path: '/collada',
    name: 'collada',
    component: ColladaView,
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
