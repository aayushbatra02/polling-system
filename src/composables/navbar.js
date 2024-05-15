import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { usePollStore } from "@/stores/pollStore";

export const useNavbar = () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const { pageNo, lastPage } = storeToRefs(usePollStore());
  const showLogout = ref(false);
  const showNavLinks = ref(false);
  const navlinks = [
    { text: "Polls", route: "/", forBoth: true },
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
    localStorage.removeItem("submittedPolls");
    user.value = null;
    pageNo.value = 1;
    lastPage.value - false;
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
