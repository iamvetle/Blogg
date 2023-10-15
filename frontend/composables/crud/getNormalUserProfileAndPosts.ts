// async

import axios from 'axios' 
import { useGeneralStore } from '~/store/generalStore';

export const getNormalUserProfileAndPosts = async (userURL:string) => {
  const store = useGeneralStore()

  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(userURL, { headers });

    if (response.data != null) {
      console.log("OK: data fetched", response.data); // print to self
      
      store.theUser = response.data as NormalUserProfileType

    } else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch data: ", error); // print to self
  }
};
