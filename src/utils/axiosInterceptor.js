import axios from "axios";

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      config.headers["ngrok-skip-browser-warning"] = "69420";
      config.baseURL = process.env.VUE_APP_BASE_URL;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
export default axiosInterceptor;
