import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { storeToRefs } from "pinia";

const axiosInterceptor = () => {
  const { token } = storeToRefs(useAuthStore());
  axios.interceptors.request.use(
    function (config) {
      config.headers["ngrok-skip-browser-warning"] = "69420";
      if (token.value) {
        config.headers["token"] = token.value;
      }
      config.baseURL = process.env.VUE_APP_BASE_URL;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
export default axiosInterceptor;
