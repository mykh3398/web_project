import { createStore } from 'vuex';
import auth from './auth';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    auth,
  },
  namespaced: true,
  plugins: [createPersistedState()],
});
