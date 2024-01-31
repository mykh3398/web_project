import axios from 'axios';

const state = {
  token: localStorage.getItem('jwtToken') || '',
  user: {
    ID_User: null
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  isAdmin: (state) => {
    if (state.token) {
      const decodedToken = parseJwt(state.token);
      if (decodedToken && decodedToken.ID_Ref_Role === 1) {
        return true;
      }
    }
    return false;
  },
  ID_User: (state) => state.user.ID_User,
  ID_Ref_Role: (state) => state.user.ID_Ref_Role,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_USER_ID: (state, ID_User) => {
    state.user.ID_User = ID_User;
  },
  SET_USER_ROLE: (state, ID_Ref_Role) => {
    state.user.ID_Ref_Role = ID_Ref_Role;
  },
};

const actions = {
  login: async ({ commit }, credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      const token = response.data.token;

      localStorage.setItem('jwtToken', token);
      commit('SET_TOKEN', token);

      const decodedToken = parseJwt(token);
      console.log('Decoded Token:', decodedToken);
      commit('SET_USER', decodedToken);
      console.log('Decoded Token:', decodedToken.ID_User);
      commit('SET_USER_ID', decodedToken.ID_User);
      console.log('Decoded Token:', decodedToken.ID_Ref_Role);
      commit('SET_USER_ROLE', decodedToken.ID_Ref_Role);
      return true; 
    } catch (error) {
      console.error('Login failed:', error);
      return false; 
    }
  },
  

  logout: async ({ commit, state }) => {
    try {
      await axios.post('http://localhost:3000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
  
      localStorage.removeItem('jwtToken');
      commit('SET_TOKEN', '');
      commit('SET_USER', null);
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
};

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export default {
  state,
  getters,
  mutations,
  actions,
};
