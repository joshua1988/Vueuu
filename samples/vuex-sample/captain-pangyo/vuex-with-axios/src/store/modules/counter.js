import * as types from '../types';

const state = {
  counter: 0
};

const getters = {
  // doubleCounter: state => {
  //   return state.counter * 2;
  // }
  [types.DOUBLE_COUNTER]: state => {
    return state.counter * 2;
  }
};

const mutations = {
  increment: (state, payload) => {
    state.counter += payload;
  }
};

const actions = {
  asyncIncrement: ({ commit }, payload) => {
    setTimeout (() => {
      commit('increment', payload.by);
    }, payload.duration);
  }
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
