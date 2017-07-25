export const asyncIncrement = ({ commit }, payload) => {
  setTimeout (() => {
    commit('increment', payload.by);
  }, payload.duration);
};

export const action2 = () => {};
