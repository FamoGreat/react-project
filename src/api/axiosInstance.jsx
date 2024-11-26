import axios from "axios";
import { useAuth } from "../context/AuthContext";

export function useAxiosInstance() {
  const { auth, logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://174.138.186.155:700/api/",
    withCredentials: true, // Include cookies for refresh token flow
  });

  console.log("am here");
  console.log(auth.accessToken);

  // Add Authorization header
  axiosInstance.interceptors.request.use(
    (config) => {
      if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle token expiration and refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(
            "http://174.138.186.155:700/api/Account/refresh-token",
            {},
            { withCredentials: true }
          );

          // Update the accessToken in auth context
          auth.login(auth.user, refreshResponse.data.token);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          logout(); // Log out the user on refresh failure
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
