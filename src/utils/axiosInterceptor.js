import axios from "axios";

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      config.headers["ngrok-skip-browser-warning"] = "69420";
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
export default axiosInterceptor;
