import { useGeneralStore } from "~/store/generalStore";

export const checkLocalInfo = () => {
  if (process.client) {
    const store = useGeneralStore();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token != null || username != null) {
      store.isAuthenticated = true
      store.username = username
    } else {
      store.isAuthenticated = false
      store.username = null
    }
    return token
  }
};
