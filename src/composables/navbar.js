import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { usePollStore } from "@/stores/pollStore";
import { useRoute } from "vue-router";

export const useNavbar = () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const { pageNo, lastPage } = storeToRefs(usePollStore());
  const showLogout = ref(false);
  const showNavLinks = ref(false);
  let navlinks = ref([
    { text: "Polls", route: "/", forBoth: true },
    { text: "Add Poll", route: "/add-poll" },
    { text: "Create User", route: "/" },
    { text: "List Users", route: "/" },
  ]);

  const route = useRoute()
  const editId = ref(null)

  watchEffect(() => {
    editId.value = route.params.id
    if (editId.value) {
      navlinks.value = [
        { text: "Polls", route: "/", forBoth: true },
        { text: "Edit Poll", route: `/edit-poll/${editId.value}` },
        { text: "Create User", route: "/create-user" },
        { text: "List Users", route: "/list-users" },
      ];
    } else {
      navlinks.value = [
        { text: "Polls", route: "/", forBoth: true },
        { text: "Add Poll", route: "/add-poll" },
        { text: "Create User", route: "/create-user" },
        { text: "List Users", route: "/list-users" },
      ];
    }
  });

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

  const clearEditId = (linkText) => {
    if (linkText !== "Add Poll" && linkText !== "Edit Poll") {
      editId.value = null;
    }
  };

  return {
    user,
    navlinks,
    handleLogoutModal,
    showLogout,
    logoutUser,
    showNavLinks,
    toggleNavlinks,
    clearEditId,
  };
};
