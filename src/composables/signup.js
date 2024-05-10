import { useSignupStore } from "@/stores/signupStore";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import router from "@/router/index.js";
import { authenticate } from "@/utils/authenticate";

export const useSignup = () => {
  const signupData = reactive({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const errorMessage = reactive({
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    password: null,
    confirmPassword: null,
  });
  const validateSignupForm = ref(false);
  const showSignupError = ref(false);

  const signupStore = useSignupStore();
  const { roles, loading, error, isUserSignedup } = storeToRefs(signupStore);

  onMounted(async () => {
    await signupStore.getRoles();
  });

  const validate = (field) => {
    showSignupError.value = false;
    if (validateSignupForm.value) {
      if (field === "confirmPassword") {
        errorMessage[field] = authenticate(field, [
          signupData.password,
          signupData.confirmPassword,
        ]);
      } else {
        errorMessage[field] = authenticate(field, signupData[field], 4);
      }
    }
  };

  const signupHandler = async () => {
    validateSignupForm.value = true;
    for (const key in signupData) {
      validate(key);
    }
    if (
      !errorMessage.firstName &&
      !errorMessage.lastName &&
      !errorMessage.email &&
      !errorMessage.role &&
      !errorMessage.password &&
      !errorMessage.confirmPassword
    ) {
      await signupStore.handleSignup({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        roleId: signupData.role,
      });
      showSignupError.value = true;
      if (isUserSignedup.value) {
        for (const key in signupData) {
          signupData[key] = "";
        }
      }
    }
  };

  const routeToLogin = () => {
    router.push("/login");
    isUserSignedup.value = false;
  };

  return {
    signupHandler,
    signupData,
    errorMessage,
    validate,
    roles,
    loading,
    error,
    showSignupError,
    isUserSignedup,
    routeToLogin,
  };
};
