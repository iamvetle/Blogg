import axios from "axios";

export const getFollowUser = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    !token ? console.log("no token") : "";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(url, { headers });
    console.log("OK: Managed to follow user", response.data); // print to self
    return response.data;
  
  } catch (error) {
    console.log("did not manage to follow user", error);
    return error;
  }
};
