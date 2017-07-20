import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter'

// seperate files
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  // getters: {
  //   doubleCounter: state => {
  //     return state.counter * 2;
  //   }
  // },
  getters,
  actions,
  mutations,
  modules: {
    // counter: counter
    counter
  }
});
