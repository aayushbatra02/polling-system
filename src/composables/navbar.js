import { ref } from "vue";

export const useNavbar = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData?.roleId === 1 ? "user" : "admin";
  const showLogout = ref(false);
  const toggleLogout = () => {
    showLogout.value = !showLogout.value;
  };
  return { userData, role, toggleLogout, showLogout };
};
