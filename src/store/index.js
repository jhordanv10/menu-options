import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { childrens: Array, optionBase1: Object, optionEye: Object},
  mutations: {
    ADD_CHILDREN(state, children) {
      state.childrens = children;
    },
    ADD_OPTION_BASE1(state, optionBase1){
      state.optionBase1 = optionBase1;
    },
    ADD_OPTION_EYE(state, optionEye){
      state.optionEye = optionEye;
    }
  }
})

export default store
