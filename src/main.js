import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import axiosInterceptor from "./utils/axiosInterceptor";

const pinia = createPinia();
const app = createApp(App);

axiosInterceptor();

app.use(pinia).use(router).mount("#app");
