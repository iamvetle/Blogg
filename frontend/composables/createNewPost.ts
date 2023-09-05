import axios from "axios";

export const createNewPost = async (url: string, formData: object) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log("OK: a new post was created", response.data);
  } catch (error) {
    console.log("FAILED: no new post was created:", error);
  }
};
