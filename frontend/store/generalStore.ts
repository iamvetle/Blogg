import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const isAuthenticated = ref(false);
  const username = ref(null);

  // error pages
  const apiDownError = ref(false);

  const changeAuthenticated = (state: boolean) => {
    isAuthenticated.value = state;
  };

  return { isAuthenticated, apiDownError, username, changeAuthenticated };
});
