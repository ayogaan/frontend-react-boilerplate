import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/', 
  timeout: 5000,
});

// // Your token refresh function (implement this according to your authentication mechanism)
// const refreshAccessToken = async () => {

//   // Make an API request to refresh the token
//   try {
    
//     const response = await axios.post('http://localhost:4000/api/refresh', {
//       // Include any necessary data to refresh the token
//     });
//     // Extract the new access token from the response
//     const newAccessToken = response.data.authorisation.token;
//     // Update your token in local storage or state
//     localStorage.setItem('jwtToken', newAccessToken);
//     return newAccessToken;
//   } catch (error) {
//     // Handle the token refresh error here (e.g., log out the user)
//     throw error;
//   }
// };

// Request interceptor to add the token to outgoing requests
AxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('jwtToken');
  config.headers['Authorization'] = `${token}`;
  return config;
});

// Response interceptor to handle token expiration and refresh
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status code indicates token expiration (e.g., 401 Unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const navigate = useNavigate();
        // const newAccessToken = await refreshAccessToken();
        // // Update the original request with the new token
        // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // // Retry the original request with the new token
        // return AxiosInstance(originalRequest);
        navigate('/login')
      } catch (refreshError) {
        // Handle the token refresh error (e.g., log out the user)
        //throw refreshError;
      }
    }

    // If the error is not related to token expiration, handle it as needed
    return Promise.reject(error);
  }
);

export default AxiosInstance;
