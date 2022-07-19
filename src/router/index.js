import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Base1View from '../views/Base1View.vue'
import Base2View from '../views/Base2View.vue'
import Base3View from '../views/Base3View.vue'
import Base4View from '../views/Base4View.vue'
import PetView from '../views/PetView.vue'
import GlovesView from '../views/GlovesView.vue'
import EyelinerView from '../views/EyelinerView.vue'
import HoddieView from '../views/HoddieView.vue'

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
    path: '/models/pet',
    name: 'models',
    component: PetView,
  },
  {
    path: '/models/gloves',
    name: 'gloves',
    component: GlovesView,
  },
  {
    path: '/models/eyeliner',
    name: 'eyeliner',
    component: EyelinerView,
  },
  {
    path: '/models/hoddie',
    name: 'hoddie',
    component: HoddieView,
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
