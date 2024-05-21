import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useSignupStore } from "@/stores/signupStore";
import router from "@/router/index.js";
import { authenticate } from "@/utils/authenticate";

export const useSignup = () => {
  const formData = reactive({
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
  const validateForm = ref(false);
  const showFormError = ref(false);

  const signupStore = useSignupStore();
  const { roles, loading, error, isFormSubmitted } = storeToRefs(signupStore);

  onMounted(async () => {
    await signupStore.getRoles();
  });

  const validateInput = (field) => {
    showFormError.value = false;
    if (validateForm.value) {
      if (field === "confirmPassword") {
        errorMessage[field] = authenticate(field, [
          formData.password,
          formData.confirmPassword,
        ]);
      } else {
        errorMessage[field] = authenticate(field, formData[field], 4);
      }
    }
  };

  const onFormSubmit = async (type) => {
    validateForm.value = true;
    for (const key in formData) {
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
      await signupStore.submitForm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        roleId: formData.role,
      }, type);
      showFormError.value = true;
      if (isFormSubmitted.value) {
        for (const key in formData) {
          formData[key] = "";
        }
      }
    }
  };

  const handleConfirmButton = (route) => {
    if (route) {
      router.push(route);
    }
    isFormSubmitted.value = false;
  };

  return {
    onFormSubmit,
    formData,
    errorMessage,
    validateInput,
    roles,
    loading,
    error,
    showFormError,
    isFormSubmitted,
    handleConfirmButton,
  };
};
