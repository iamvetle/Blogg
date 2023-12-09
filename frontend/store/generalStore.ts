import { defineStore } from 'pinia';

export const useGeneralStore = defineStore("General store for general things", () => {

  /**
 * This is the base url of the API endpoint where everything is fetched.
 */
  const baseAPIURL = ref<string>("http://localhost:8888") // baseSearchURL (<any>null)

  /**
   * Is true or false depending on whether the web client has a valid token (is logged-in or not).
   * The middleware (or composable, or plugins?) is what test it beforehand (I think)
   */
  const isAuthenticated = ref(false);

  /** Is continuesly updated by the watcher */
  const token = ref(localStorage.getItem('token'));

  /** Automatically updates when I get a value in localstorage */
  const isAuth = computed(() => !!token.value);
  
  // Watch for changes in localStorage and update the ref accordingly
  watch(() => localStorage.getItem('token'), (newToken) => {
    token.value = newToken;
  });

  /**
   * Has the username of the authenticated web client. Is given at the login page (i think)
   */
  const username = ref<string | null>(null)

  /**
   * @deprecated
   * Is offline. (Function not in use)
   * 
   * Is supposed to store the state of whether the api server is online or not
   * 
   */
  const apiDownError = ref(false);

  const backgroundForModal = ref<null | string>(null)

  const turnBackgroundForModel = (option:null | string) => {
    backgroundForModal.value = option
  }

  /**
   * Decides whether the search bar in the navbar should be shown (depending on if web client is authenticated)
   */
  const search_bar_show = ref(false)
  
  return { search_bar_show, isAuth, token, isAuthenticated, apiDownError, username, baseAPIURL, backgroundForModal, turnBackgroundForModel }
});
