import { useUserListStore } from "@/stores/userListStore";
import { onMounted, ref, watch } from "vue";

export const useUserList = () => {
  const { getUsers } = useUserListStore();
  const users = ref([]);
  const rows = ref(10);
  const pageNumber = ref(1);
  const disablePrevButton = ref(true);
  const disableNextButton = ref(false);

  const fetchUsers = async () => {
    users.value = await getUsers(pageNumber.value, rows.value);
  };

  onMounted(() => {
    fetchUsers();
  });

  watch([rows, pageNumber], async () => {
    await fetchUsers();

    if (pageNumber.value === 1) {
      disablePrevButton.value = true;
    } else {
      disablePrevButton.value = false;
    }

    if (users.value.length < rows.value) {
      disableNextButton.value = true;
    } else {
      disableNextButton.value = false;
    }
  });

  watch(rows, () => (pageNumber.value = 1));

  const nextPage = () => {
    pageNumber.value++;
  };

  const prevPage = () => {
    pageNumber.value--;
  };

  return {
    users,
    rows,
    pageNumber,
    prevPage,
    nextPage,
    disablePrevButton,
    disableNextButton,
  };
};
