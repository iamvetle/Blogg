// async

import axios from 'axios' 
import { useGeneralStore } from '~/store/generalStore';

export const getSnippetPostAllLoggedInUser = async () => {
  const store = useGeneralStore()

  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get<LoggedInUserMultiplePostType>(store.personal_post_snippets_url, { headers });

    if (response.data != null) {
      console.log("OK: Personal posts fetched", response.data); // print to self
      
      store.personalPosts = response.data;
    
    } else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch personal posts: ", error); // print to self
  }
};
