import { getAccessToken } from './auth';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://main-cxgvpi5ruq-ey.a.run.app/api/',
  });

instance.interceptors.request.use(async config => {
  // Attach access token to request if the user is logged in.
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;