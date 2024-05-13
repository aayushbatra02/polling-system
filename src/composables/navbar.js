import router from "@/router";
import { ref } from "vue";

export const useNavbar = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData?.roleId === 1 ? "user" : "admin";
  const showLogout = ref(false);
  const showNavLinks = ref(false);

  const toggleNavlinks = () => {
    showNavLinks.value = !showNavLinks.value;
    if (showNavLinks.value) {
      showLogout.value = false;
    }
  };

  const toggleLogout = () => {
    showLogout.value = !showLogout.value;
    if (showLogout.value) {
      showNavLinks.value = false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  return {
    userData,
    role,
    toggleLogout,
    showLogout,
    logoutUser,
    showNavLinks,
    toggleNavlinks,
  };
};
