import { useAuthStore } from "@/stores/AuthStore";
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { authenticateEmail } from "@/utils/authenticateEmail";
import { authenticatePassword } from "@/utils/authenticatePassword";

export const useLogin = () => {
  const authStore = useAuthStore();
  const { loginError, isUserAuthenticated } = storeToRefs(authStore);

  onMounted(() => {
    isUserAuthenticated.value = false;
  });

  const loginData = reactive({
    email: "",
    password: "",
  });

  const errorMessage = reactive({
    email: "",
    password: "",
  });

  const doValidation = ref(false);

  const showLoginError = ref(false);

  const loginHandler = () => {
    doValidation.value = true;
    validateEmail();
    validatePassword();
    if (!errorMessage.email && !errorMessage.password) {
      showLoginError.value = true;
      authStore.handleLogin(loginData.email, loginData.password);
    }
  };

  const validateEmail = () => {
    showLoginError.value = false;
    if (doValidation.value) errorMessage.email = authenticateEmail(loginData.email)
          
  };

  const validatePassword = () => {
    showLoginError.value = false;
    if (doValidation.value) {
      errorMessage.password = authenticatePassword(loginData.password)
    }
  };

  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  return {loginData, validateEmail, errorMessage, showPassword, validatePassword, togglePassword, loginError, showLoginError, loginHandler}
};
