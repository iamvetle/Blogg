import { defineStore } from 'pinia';

export const useGeneralStore = defineStore("General store for general things", () => {

  /**
 * This is the base url of the API endpoint where everything is fetched.
 */
  const baseAPIURL = ref(urls.baseApiURL) // baseSearchURL (<any>null)

  const backgroundForModal = ref<null | string>(null)

  const turnBackgroundForModel = (option:null | string) => {
    backgroundForModal.value = option
  }

  /**
   * Decides whether the search bar in the navbar should be shown (depending on if web client is authenticated)
   */
  const search_bar_show = ref(false)

  // const api_urls = {
  //   api:[
  //     "feed/",
  //     "feed/following/",
      
  //     "tags/",
  //     "categories/",
      
  //     "health_check/",
            
  //     "min-side/posts/",
  //     "min-side/posts/<int:pk/edit/",
  //     "min-side/followers/",
  //     "min-side/following",

  //     "newpost/",

  //     "posts/saved/",
  //     "post/<int-pk>/",
  //     "post/<int:post_id>/save/",

  //     "post/<int:post_id>/comments/",
  //     "post/<int:post_id>/add-comment/",
  //     "post/<int:post_id>/remove-comment/<int:comment_id>/",
  //   ],
  //   users:[
  //     "login/",
  //     "registrer/",

  //     "min-side/",
  //     "min-side/profile_picture/edit",

  //     "<str:username>/",
  //     "<str:username/posts/",
  //     "<str:username>/follow/",
  //     "<str:username>/unfollow/",
  //   ]
  // }
  
// Module for API URLs


  return { search_bar_show, baseAPIURL, backgroundForModal, turnBackgroundForModel }
});
