import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { childrens: Array},
  mutations: {
    ADD_CHILDREN(state, children) {
      state.childrens = children;
    }
  }
})

export default store
