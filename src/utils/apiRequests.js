import axios from 'axios';

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(
      window.localStorage.getItem('userData')
    )}`,
  },
});

const apiRequests = {
  post: (path, payload) => axios.post(path, payload, getHeader()),
  get: (path) => axios.get(path, getHeader()),
  put: (path, payload) => axios.put(path, payload, getHeader()),
  delete: (path) => axios.delete(path, getHeader()),
};

export default apiRequests;
