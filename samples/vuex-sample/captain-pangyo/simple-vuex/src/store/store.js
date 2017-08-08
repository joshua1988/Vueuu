import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    getCounter: function (state) {
      return state.counter;
    }
  },
  mutations: {
    addCounter: function (state, payload) {
      return state.counter++;
    }
  },
  actions: {
    addCounter: function (context) {
      return context.commit('addCounter');
    }
  }
});
