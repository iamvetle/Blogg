import { postMethod } from "~/services/apiByCRUD";

export const postCommentOnPost = async (url: string, formData: object): Promise<object | null> => {

    const token = retrieveToken();

    if (token === null) {
        console.log("There was no token")
        return null
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
    };

    console.log(url)

    console.log(formData) // print to self

    const response = await postMethod(url, formData, headers)

    if (response) {
        console.log("OK: the comment was created and added", response.data); // print to self
        return response.data
    } else {
        console.log("FAILED: did not manage to comment on post:") // print to self
        return null
    }
};
