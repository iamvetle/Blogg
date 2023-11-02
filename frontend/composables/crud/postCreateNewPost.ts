import axios from "axios";

export const postCreateNewPost = async (url: string, formData: object) => {
  
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  console.log(formData)

  try {
    const response = await axios.post(url, formData, { headers })
    console.log(toRaw(response.data)) 
    
    console.log("OK: a new post was created", response.data);

    return response
  } catch (error) {
    console.log("FAILED: no new post was created:", error);
    return null
  }
};
