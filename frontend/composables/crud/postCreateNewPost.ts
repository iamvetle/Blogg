import { postMethod } from "~/services/apiByCRUD";

export const postCreateNewPost = async (url: string, formData: object): Promise<object | null> => {

  const token = retrieveToken();

  if (token === null) {
    console.log("There was no token")
    return null
  }

  const headers = {
    Authorization: `Token ${token}`,
  };

  // console.log(formData) // print to self

  const response = await postMethod(url, formData, headers)

  if (response) {
    // console.log("OK: a new post was created", response.data); // print to self
    return response.data
  } else {
    console.log("FAILED: no new post was created:") // print to self
    return null
  }
};
