import { useGeneralStore } from "@/store/generalStore";

/**
 * Effective and IN-USE
 * 
 * ! DOES NOT CHECK THE SINGLE POST PAGES
 * TODO ^
 * 
 * **First**: Updates token memory 
 * 
 * Checks if there are a token in localStorage and then updates
 * the store to either null (if no token was found), or token (if there
 * was a token present).
 * 
 * ---
 * 
 * **Second**: Redirection rules
 * 
 * These are "path guards", or redirection rules. 
 * 
 * The redirection rules makes sure that the web client doesn't
 * access paths that they are not allowedd to access, and that they
 * are then redirect to the correct path, "equivelant".
 */

/**
 * These are **GLOBAL middleware** and will be executed BEFORE everything.
 */

//@ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {

  let token
  let username
  let generalStore

  /**
   * If there is a token in localStorage, the 'generalStore.isAuthenticated'
   * gets updated. The username also get's updated in the store.
   * 
   * If there are NO token. Both 'isAuthenticated' and 'username' is set
   * to null.
   */
  if (process.client) {
    token = localStorage.getItem("token");
    username = localStorage.getItem("username")
    generalStore = useGeneralStore();

    /**
     * If there WAS a token in localStorage
     */
    if (token) {
      generalStore.isAuthenticated = true
      if (username) {
        generalStore.username = username
      }
      
    /**
     * If there was NOT a token in localStorage
     */
    } else {
      generalStore.isAuthenticated = false;
      generalStore.username = null
    }
  }

  if (process.client) {

    const path_place = to.path;

    if (token == null) { // If NOT authorized (token==null)

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
    } else if (token != null) { // If IS authorized (token==true)

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
