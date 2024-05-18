import { useUserListStore } from "@/stores/userListStore";
import { onMounted, ref } from "vue";

export const useUserList = () => {
  const { getUsers } = useUserListStore();
  const users = ref([]);

  onMounted(async () => {
    users.value = await getUsers();
  });

  return { users };
};
