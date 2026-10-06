import axios from 'axios';

const API_URL = 'http://localhost:9000';

export default {
  login(user) {
    return axios.post(`${API_URL}/login`, user);
  },

  register(user) {
    return axios.post(`${API_URL}/register`, user);
  },

  getProfile() {
    return axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },


  getProfileByUsername(username) {
    return axios.get(`http://localhost:9000/profile/${encodeURIComponent(username)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
};
