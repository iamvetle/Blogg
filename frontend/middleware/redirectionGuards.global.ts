
/**
 * ! Effective and IN-USE?????
 * 
 * ---
 * 
 * **First**: Redirection rules
 * 
 * These are "path guards", or redirection rules. 
 * 
 * The redirection rules makes sure that the web client doesn't
 * access paths that they are not allowedd to access, and that they
 * are then redirect to the correct path, "equivelant".
 */

/**
 * This is **GLOBAL middleware** and will be executed BEFORE everything.
 */

//@ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {

  const authStore = useAuthStore()

  if (process.client) {

    const path_place = to.path;

    if (!authStore.isAuthenticated) { // If NOT authorized (token==null)

      /**
       * These rules makes makes that a web client that does NOT have a (localStorage) token,
       * can access sites that are meant for authorized users.
       * 
       * They are rather redirected to the "un-authorized" equivelant. Such as "/register" instead
       * of "/login"
       */
      switch (path_place) {
        case "/minkonto":
          return navigateTo("/login");
        case "/newpost":
          return navigateTo("/login");
        case "/loggut":
          return navigateTo("/wait");
        case "/":
          return navigateTo("/wait");
        default:
          console.log(
            "Allowed navigation route: ",
            `from ${from.path} to ${to.path}`,
          );
          return null;
      }
    } else { // If IS authorized

      /**
       * These "rules" makes sure that a web client with  a (localStorage) token,
       * cannot access sites that are meant for unauthorized users, such as "/register",
       * or "/login".
       * 
       * They are then rather redirected to the "logged-in" equivelant
       */
      switch (path_place) {
        case "/registrer":
          return navigateTo("/minkonto");
        case "/login":
          return navigateTo("/minkonto");
        case "/wait":
          return navigateTo("/");
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
