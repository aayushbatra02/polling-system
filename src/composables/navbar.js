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
  let navlinks = ref([]);

  const route = useRoute();
  const editId = ref(null);

  watchEffect(() => {
    editId.value = route.params.id;
    navlinks.value = [
      { text: "Polls", route: "/", forBoth: true },
      {
        text: editId.value ? "Edit Poll" : "Add Poll",
        route: editId.value ? `/edit-poll/${editId.value}` : "/add-poll",
      },
      { text: "Create User", route: "/create-user" },
      { text: "List Users", route: "/list-users" },
    ];
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
