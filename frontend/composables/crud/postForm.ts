import axios from "axios";

interface FetchResponseType {
  token: string;
  username:string;
}

export const postForm = async (url: string, formData: object) => {
  try {
    const response = await axios.post<FetchResponseType>(url, formData);
    
    console.log("OK: form posted") // print to self
    return response
  
  } catch (error) {
    console.log("FAILED: no form posted"); // print to self
    return null;
  }
};
