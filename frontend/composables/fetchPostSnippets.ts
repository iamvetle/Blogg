// async

import axios from 'axios' 
import { useGeneralStore } from '~/store/generalStore';

export const fetchPostSnippets = async () => {
  const store = useGeneralStore()

  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get<ArticlesSnippetsType[]>(store.post_snippets_url, { headers });

    if (response.data != null) {
      console.log("OK: Posts fetched", response.data); // print to self

      await fixPagination(response.data) // calls the pagination composable for the paginatioin.vue
      
      store.posts = response.data as ArticlesSnippetsType;
    
    } else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch posts: ", error); // print to self
  }
};
