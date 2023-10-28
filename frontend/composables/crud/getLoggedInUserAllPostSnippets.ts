// async

import axios from 'axios' 
import { usePostStore } from '~/store/postStore';

export const getLoggedInUserAllPostSnippets = async () => {
  const postStore = usePostStore()

  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get<LoggedInUserMultiplePostType>(postStore.baseLoggedInUserPostsURL, { headers });

    if (response.data != null) {
      console.log("OK: Personal posts fetched", response.data); // print to self
      
      postStore.loggedInUserPosts = response.data;
    
    } else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch personal posts: ", error); // print to self
  }
};
