import { postMethod } from "../apiByCRUD";

export const postForm = async (url: string, formData: object): Promise<object | null> => {

  /** The actual POST fetch */
  const response = await postMethod(url, formData)

  /** Returns the data from the response */
  if (response) {
    return response.data
  } else {
    console.log("FAILED: no form posted"); // print to self
    return null
  }
};
