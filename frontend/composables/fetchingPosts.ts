import axios from 'axios'

export const fetchingPosts = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get<PostType[]>(url, { headers });

    if (response.data != null) {
      console.log("OK: Posts fetched", response.status, response.data); // print to self
      
      return response.data;
    
    } else {
      console.log("OBS! Fetching succsedded, but response(data) was:", response.status, response.data) // print to self

      return response.data
    }

  } catch (error) {
    console.error("ERROR: An error occured while trying to fetch posts: ", error); // print to self
    return null;
  }
};
