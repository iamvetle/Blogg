

//@ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("token")

    const path_place = to.path;

    if (token == null) {
      // No token

      switch (path_place) {
        case "/minkonto":
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
          return navigateTo("/minkonto");
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
