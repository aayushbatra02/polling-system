import { useSignupStore } from "@/stores/SignupStore";
import {
  authenticateEmail,
  authenticateField,
  authenticatePassword,
} from "@/utils/authenticate";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import router from "@/router/index.js";

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
  const validateSignupFrom = ref(false);
  const showSignupError = ref(false);

  const signupStore = useSignupStore();
  const { roles, loading, error, signupMessage } = storeToRefs(signupStore);

  onMounted(() => {
    signupStore.getRoles();
  });

  const validateFirstName = () => {
    showSignupError.value = false;
    if (validateSignupFrom.value) {
      errorMessage.firstName = authenticateField(
        signupData.firstName,
        "First Name",
        "minFourChar"
      );
    }
  };

  const validateLastName = () => {
    showSignupError.value = false;
    if (validateSignupFrom.value) {
      errorMessage.lastName = authenticateField(
        signupData.lastName,
        "Last Name",
        "minFourChar"
      );
    }
  };

  const validateEmail = () => {
    showSignupError.value = false;
    if (validateSignupFrom.value)
      errorMessage.email = authenticateEmail(signupData.email);
  };

  const validateRole = () => {
    showSignupError.value = false;
    if (validateSignupFrom.value) {
      errorMessage.role = authenticateField(signupData.role, "Role");
    }
  };

  const validatePassword = () => {
    showSignupError.value = false;
    if (validateSignupFrom.value) {
      errorMessage.password = authenticatePassword(signupData.password);
    }
  };

  const validateConformPassword = () => {
    showSignupError.value = false;
    if (
      validateSignupFrom.value &&
      signupData.password !== signupData.confirmPassword
    ) {
      errorMessage.confirmPassword = "Conform Password does not match";
    } else {
      errorMessage.confirmPassword = null;
    }
  };

  const signupHandler = async () => {
    validateSignupFrom.value = true;
    validateFirstName();
    validateLastName();
    validateEmail();
    validateRole();
    validatePassword();
    validateConformPassword();
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
      if (signupMessage.value) {
        for (const property in signupData) {
          signupData[property] = "";
        }
      }
    }
  };

  const routeToLogin = () => {
    router.push("/login");
    signupMessage.value = null;
  };

  return {
    signupHandler,
    signupData,
    errorMessage,
    validateFirstName,
    validateLastName,
    validateEmail,
    validateRole,
    validatePassword,
    validateConformPassword,
    roles,
    loading,
    error,
    showSignupError,
    signupMessage,
    routeToLogin,
  };
};
