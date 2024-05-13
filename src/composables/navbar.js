import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const useNavbar = () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const showLogout = ref(false);
  const showNavLinks = ref(false);
  const navlinks = [
    { text: "Polls", route: "/", forUser: true },
    { text: "Add Poll", route: "/" },
    { text: "Create User", route: "/" },
    { text: "List Users", route: "/" },
  ];

  const toggleNavlinks = () => {
    showNavLinks.value = !showNavLinks.value;
    if (showNavLinks.value) {
      showLogout.value = false;
    }
  };

  const handleLogoutModal = () => {
    showLogout.value = !showLogout.value;
    if (showLogout.value) {
      showNavLinks.value = false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user.value = null
    router.push("/login");
  };

  return {
    user,
    navlinks,
    handleLogoutModal,
    showLogout,
    logoutUser,
    showNavLinks,
    toggleNavlinks,
  };
};
