import axios from 'axios';
import store from './index';

store.subscribe((mutation) => {
  if (mutation.type === 'auth/SET_TOKEN') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
  }
});
