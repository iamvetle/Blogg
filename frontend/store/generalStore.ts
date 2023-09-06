export const useGeneralStore = defineStore("general", () => {
  const isAuthenticated = ref(false);
  
  // error pages
  const apiDownError = ref(false);
  const username = ref(null)

  const changeAuthenticated = (state: boolean) => {
    isAuthenticated.value = state;
  };

  return { isAuthenticated, apiDownError, username, changeAuthenticated };
});
