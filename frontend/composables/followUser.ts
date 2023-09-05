import axios from "axios";

export const followUser = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    !token ? console.log("no token") : "";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(url, { headers });
    console.log("OK: fetched personal user account", response.data); // print to self
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
