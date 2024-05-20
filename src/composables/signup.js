import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useSignupStore } from "@/stores/signupStore";
import router from "@/router/index.js";
import { authenticate } from "@/utils/authenticate";

export const useSignup = () => {
  const signupData = reactive({
    firstName: "test",
    lastName: "user",
    email: "testuser6@gmail.com",
    role: 1,
    password: "qweR123$",
    confirmPassword: "qweR123$",
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

  const validateInput = (field) => {
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

  const onSignup = async (type) => {
    validateSignupForm.value = true;
    for (const key in signupData) {
      validateInput(key);
    }
    if (
      !errorMessage.firstName &&
      !errorMessage.lastName &&
      !errorMessage.email &&
      !errorMessage.role &&
      !errorMessage.password &&
      !errorMessage.confirmPassword
    ) {
      await signupStore.signupUser({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        roleId: signupData.role,
      }, type);
      showSignupError.value = true;
      if (isUserSignedup.value) {
        for (const key in signupData) {
          signupData[key] = "";
        }
      }
    }
  };

  const handleConfirmButton = (route) => {
    if (route) {
      router.push(route);
    }
    isUserSignedup.value = false;
  };

  return {
    onSignup,
    signupData,
    errorMessage,
    validateInput,
    roles,
    loading,
    error,
    showSignupError,
    isUserSignedup,
    handleConfirmButton,
  };
};
