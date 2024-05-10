import { useAuthStore } from "@/stores/authStore";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { authenticate } from "@/utils/authenticate";

export const useLogin = () => {
  const authStore = useAuthStore();
  const { handleLogin } = authStore;
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

  const loginHandler = async () => {
    validateForm.value = true;
    for (const key in loginData) {
      validate(key);
    }
    if (!errorMessage.email && !errorMessage.password) {
      showLoginError.value = true;
      await handleLogin(loginData.email, loginData.password);
    }
  };

  const validate = (field) => {
    showLoginError.value = false;
    if (validateForm.value) {
      if(field === 'password'){
        errorMessage[field] = authenticate(field, loginData[field], 'login');
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
    loginHandler,
    loading,
    validate
  };
};
