// async

import axios from 'axios' 
import { useGeneralStore } from '~/store/generalStore';

export const fetchPostSnippets = async (optionalURL:string) => {
  const store = useGeneralStore()

  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    console.log(token)
    console.log(headers)

    let response;

    if (optionalURL) {
      response = await axios.get(optionalURL, { headers })
    } else {
      response = await axios.get(store.baseFeedURL, { headers });
    }

    console.log(toRaw(response))

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
