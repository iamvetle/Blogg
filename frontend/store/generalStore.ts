import { defineStore } from 'pinia';

export const useGeneralStore = defineStore("General store for general things", () => {

  /**
 * This is the base url of the API endpoint where everything is fetched.
 */
  const baseAPIURL = ref("http://localhost:8888") // baseSearchURL (<any>null)

  const backgroundForModal = ref<null | string>(null)

  const turnBackgroundForModel = (option:null | string) => {
    backgroundForModal.value = option
  }

  /**
   * Decides whether the search bar in the navbar should be shown (depending on if web client is authenticated)
   */
  const search_bar_show = ref(false)
  
  return { search_bar_show, baseAPIURL, backgroundForModal, turnBackgroundForModel }
});
