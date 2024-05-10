import { ref } from "vue";

export const useTogglePassword = () => {
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  };

  return {
    showPassword,
    togglePassword,
    showConfirmPassword,
    toggleConfirmPassword,
  };
};
