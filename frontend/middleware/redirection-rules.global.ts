

import { useGeneralStore } from "@/store/generalStore";
//@ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username");

    const store = useGeneralStore();

    if (token != null) {
      (store.isAuthenticated = true)
      store.username = username
    } else {
      (store.isAuthenticated = false);
      store.username = null
    }

    const path_place = to.path;

    if (token == null) {
      // No token

      switch (path_place) {
        case "/min-side":
          return navigateTo("/login");
        case "/newpost":
          return navigateTo("/login");
        case "/loggut":
          return navigateTo("/");
        default:
          console.log(
            "Allowed navigation route: ",
            `from ${from.path} to ${to.path}`,
          );
          return;
      }
    } else if (token != null) {
      // If have token

      switch (path_place) {
        case "/registrer":
          return navigateTo("/");
        case "/login":
          return navigateTo("/min-side");
        default:
          console.log(
            "Allowed navigation route: ",
            `from ${from.path} to ${to.path}`,
          );
          return null;
      }
    }
  }
});
