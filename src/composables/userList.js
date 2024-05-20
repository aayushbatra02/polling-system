import { useUserListStore } from "@/stores/userListStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

export const useUserList = () => {
  const { getUsers } = useUserListStore();
  const { users } = storeToRefs(useUserListStore());
  const count = ref(10);
  const pageNumber = ref(1);
  const disablePrevButton = ref(true);
  const disableNextButton = ref(false);

  onMounted(() => {
    getUsers(pageNumber.value, count.value);
  });

  watch([count, pageNumber], async () => {
    await getUsers(pageNumber.value, count.value);

    if (pageNumber.value === 1) {
      disablePrevButton.value = true;
    } else {
      disablePrevButton.value = false;
    }

    if (users.value.length < count.value) {
      disableNextButton.value = true;
    } else {
      disableNextButton.value = false;
    }
  });

  watch(count, () => (pageNumber.value = 1));

  const nextPage = () => {
    pageNumber.value++;
  };

  const prevPage = () => {
    pageNumber.value--;
  };

  return {
    count,
    pageNumber,
    prevPage,
    nextPage,
    disablePrevButton,
    disableNextButton,
  };
};
