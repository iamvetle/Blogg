// async


/**
 * 
 * 
 * I think I have to split up the api to smaller parts
 * like not everything from a user in one api request
 * and also, I have to awear of where i am actually calling the api - in the pages?, component, composable?
 *  i have to find a system for that
 */

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
      
      store.theUser = null
      store.theUser = response.data as NormalUserProfileType

      console.log(store.theUser[0])
      console.log(toRaw(store.theUser[0].num_of_followers))
      await getLoggedInUserAllFollowing()



    } 
    else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch data: ", error); // print to self
  }
};
