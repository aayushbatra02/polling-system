import { useAuthStore } from "@/stores/AuthStore";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { authenticateEmail, authenticateField } from "@/utils/authenticate";

export const useLogin = () => {
  const authStore = useAuthStore();
  const { loginError, loading } = storeToRefs(authStore);

  const loginData = reactive({
    email: "",
    password: "",
  });

  const errorMessage = reactive({
    email: null,
    password: null,
  });

  const validateForm = ref(false);
  const showLoginError = ref(false);
  const showPassword = ref(false);

  const loginHandler = () => {
    validateForm.value = true;
    validateEmail();
    validatePassword();
    if (!errorMessage.email && !errorMessage.password) {
      showLoginError.value = true;
      authStore.handleLogin(loginData.email, loginData.password);
    }
  };

  const validateEmail = () => {
    showLoginError.value = false;
    if (validateForm.value)
      errorMessage.email = authenticateEmail(loginData.email);
  };

  const validatePassword = () => {
    showLoginError.value = false;
    if (validateForm.value) {
      errorMessage.password = authenticateField(loginData.password, "Password");
    }
  };

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  return {
    loginData,
    validateEmail,
    errorMessage,
    showPassword,
    validatePassword,
    togglePassword,
    loginError,
    showLoginError,
    loginHandler,
    loading,
  };
};
