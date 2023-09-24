import { useGeneralStore } from "@/store/generalStore";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    const store = useGeneralStore();

    if (token != null) {
      (store.isAuthenticated = true)
      store.username = username
    } else {
      (store.isAuthenticated = false);
      store.username = null
    }
    console.log(token);
    console.log(store.isAuthenticated);
  }
});
