import axios from 'axios';
import http from 'http';
import https from 'https';

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const axiosInstance = axios.create({
  httpAgent,
  httpsAgent,
  timeout: 120000, // 120 seconds in milliseconds
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

axios.defaults.timeout = 120000;  // 120 seconds in milliseconds

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Only set the Content-Type if it hasn't been set already
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add this function to get the access token
function getAccessToken() {
  console.log('getting access token');
  return localStorage.getItem('access_token');
}

export default axiosInstance;