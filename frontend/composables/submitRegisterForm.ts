import axios from "axios";

export const submitRegisterForm = async (url: string, formData: object) => {
  try {
    const response = await axios.post(url, formData);
    console.log("OK: created user account", response.data); // print to self
    return true;
  } catch {
    console.log("FAILED: no user account was created"); // print to self
    return false;
  }
};
