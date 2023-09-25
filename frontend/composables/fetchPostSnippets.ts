// async

import axios from 'axios' 
import { useGeneralStore } from '~/store/generalStore';


export const fetchPostSnippets = async () => {
  const store = useGeneralStore()
  const { $fetchWithToken } = useNuxtApp()

  try {

    const response = await $fetchWithToken.get<SnippetPostType[]>(store.post_snippets_url);

    if (response.data != null) {
      console.log("OK: Posts fetched", response.data); // print to self

      await fixPagination(response.data) // calls the pagination composable for the paginatioin.vue
      
      store.posts = response.data as SnippetPostType;
    
    } else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch posts: ", error); // print to self
  }
};
