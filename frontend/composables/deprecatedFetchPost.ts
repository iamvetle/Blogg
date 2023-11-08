// async
/**
 */

import axios from 'axios' 

export const fetchPost = async (postURL:string) => {

  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(postURL, { headers });

    if (response.data != null) {
      console.log("OK: post fetched", response.data); // print to self

      return response.data

    } else {
      console.log("OBS! Fetching succsedded, but response(post) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch post: ", error); // print to self
  }
};
