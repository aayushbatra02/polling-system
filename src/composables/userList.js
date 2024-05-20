import { useUserListStore } from "@/stores/userListStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

export const useUserList = () => {
  const { getUsers } = useUserListStore();
  const { users } = storeToRefs(useUserListStore());
  const limit = ref(10);
  const pageNumber = ref(1);
  const disablePrevButton = ref(true);
  const disableNextButton = ref(false);

  onMounted(() => {
    getUsers(pageNumber.value, limit.value);
  });

  watch([limit, pageNumber], async () => {
    await getUsers(pageNumber.value, limit.value);

    if (pageNumber.value === 1) {
      disablePrevButton.value = true;
    } else {
      disablePrevButton.value = false;
    }

    if (users.value.length < limit.value) {
      disableNextButton.value = true;
    } else {
      disableNextButton.value = false;
    }
  });

  watch(limit, () => (pageNumber.value = 1));

  const nextPage = () => {
    pageNumber.value++;
  };

  const prevPage = () => {
    pageNumber.value--;
  };

  return {
    limit,
    pageNumber,
    prevPage,
    nextPage,
    disablePrevButton,
    disableNextButton,
  };
};
