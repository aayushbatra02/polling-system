import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { authenticate } from "@/utils/authenticate";

export const useLogin = () => {
  const authStore = useAuthStore();
  const { loginUser } = authStore;
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

  const onLogin = async () => {
    validateForm.value = true;
    for (const key in loginData) {
      validateInput(key);
    }
    if (!errorMessage.email && !errorMessage.password) {
      showLoginError.value = true;
      await loginUser(loginData.email, loginData.password);
    }
  };

  const validateInput = (field) => {
    showLoginError.value = false;
    if (validateForm.value) {
      if (field === "password") {
        errorMessage[field] = authenticate(field, loginData[field], "login");
      } else {
        errorMessage[field] = authenticate(field, loginData[field]);
      }
    }
  };

  return {
    loginData,
    errorMessage,
    loginError,
    showLoginError,
    onLogin,
    loading,
    validateInput,
  };
};
